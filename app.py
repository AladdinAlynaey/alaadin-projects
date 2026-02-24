"""
Project Hub — Flask Portfolio Application
A single-place hub to showcase all your projects.
"""

import os
import json
import uuid
import threading
from datetime import datetime
from functools import wraps

from flask import (
    Flask, render_template, request, jsonify, session,
    redirect, url_for, send_from_directory
)
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'project-hub-secret-key-change-me')

# ─── Configuration ───────────────────────────────────────────────

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data', 'projects.json')
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'}
MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5 MB

app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Thread lock for JSON file access
file_lock = threading.Lock()

# ─── Helpers ─────────────────────────────────────────────────────

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def load_projects():
    """Load projects from JSON file."""
    with file_lock:
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []


def save_projects(projects):
    """Save projects to JSON file."""
    with file_lock:
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(projects, f, ensure_ascii=False, indent=2)


def admin_required(f):
    """Decorator to require admin login."""
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('is_admin'):
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated


# ─── Page Routes ─────────────────────────────────────────────────

@app.route('/')
def index():
    """Public gallery page."""
    return render_template('index.html')


@app.route('/admin')
def admin():
    """Admin panel."""
    return render_template('admin.html')


# ─── API: Public ─────────────────────────────────────────────────

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects (public only, unless admin)."""
    projects = load_projects()
    is_admin = session.get('is_admin', False)

    if not is_admin:
        projects = [p for p in projects if not p.get('is_private', False)]

    # Sort by created_at descending (newest first)
    projects.sort(key=lambda p: p.get('created_at', ''), reverse=True)
    return jsonify(projects)


@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get categories that have at least one project."""
    projects = load_projects()
    is_admin = session.get('is_admin', False)
    if not is_admin:
        projects = [p for p in projects if not p.get('is_private', False)]
    cats = list(set(p.get('category', 'other') for p in projects))
    cats.sort()
    return jsonify(cats)


@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    """Get a single project."""
    projects = load_projects()
    project = next((p for p in projects if p['id'] == project_id), None)

    if not project:
        return jsonify({'error': 'Project not found'}), 404

    return jsonify(project)


@app.route('/api/verify-password/<project_id>', methods=['POST'])
def verify_password(project_id):
    """Verify password for a private project."""
    projects = load_projects()
    project = next((p for p in projects if p['id'] == project_id), None)

    if not project:
        return jsonify({'error': 'Project not found'}), 404

    if not project.get('is_private'):
        return jsonify({'success': True, 'url': project['url']})

    data = request.get_json()
    password = data.get('password', '')

    if password == project.get('password', ''):
        return jsonify({'success': True, 'url': project['url']})
    else:
        return jsonify({
            'success': False,
            'error': 'Incorrect password',
            'hint': project.get('password_hint', '')
        }), 403


# ─── API: Admin Auth ─────────────────────────────────────────────

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Admin login."""
    data = request.get_json()
    password = data.get('password', '')

    if password == ADMIN_PASSWORD:
        session['is_admin'] = True
        return jsonify({'success': True})
    else:
        return jsonify({'error': 'Invalid password'}), 401


@app.route('/api/admin/logout', methods=['POST'])
def admin_logout():
    """Admin logout."""
    session.pop('is_admin', None)
    return jsonify({'success': True})


@app.route('/api/admin/check', methods=['GET'])
def admin_check():
    """Check if admin is logged in."""
    return jsonify({'is_admin': session.get('is_admin', False)})


# ─── API: Admin CRUD ─────────────────────────────────────────────

@app.route('/api/admin/projects', methods=['GET'])
@admin_required
def admin_get_projects():
    """Get all projects (including private) for admin."""
    projects = load_projects()
    projects.sort(key=lambda p: p.get('created_at', ''), reverse=True)
    return jsonify(projects)


@app.route('/api/admin/projects', methods=['POST'])
@admin_required
def create_project():
    """Create a new project."""
    name_en = request.form.get('name_en', '').strip()
    name_ar = request.form.get('name_ar', '').strip()
    description_en = request.form.get('description_en', '').strip()
    description_ar = request.form.get('description_ar', '').strip()
    url = request.form.get('url', '').strip()
    category = request.form.get('category', 'other').strip()
    is_private = request.form.get('is_private', 'false').lower() == 'true'
    password = request.form.get('password', '').strip()
    password_hint = request.form.get('password_hint', '').strip()

    if not name_en:
        return jsonify({'error': 'English name is required'}), 400

    # Handle image upload
    image_path = ''
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            filename = f"{uuid.uuid4().hex}.{ext}"
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            image_path = f"uploads/{filename}"

    project = {
        'id': uuid.uuid4().hex,
        'name_en': name_en,
        'name_ar': name_ar,
        'description_en': description_en,
        'description_ar': description_ar,
        'url': url,
        'image': image_path,
        'category': category,
        'is_private': is_private,
        'password': password if is_private else '',
        'password_hint': password_hint if is_private else '',
        'created_at': datetime.utcnow().isoformat(),
        'updated_at': datetime.utcnow().isoformat()
    }

    projects = load_projects()
    projects.append(project)
    save_projects(projects)

    return jsonify(project), 201


@app.route('/api/admin/projects/<project_id>', methods=['PUT'])
@admin_required
def update_project(project_id):
    """Update an existing project."""
    projects = load_projects()
    project_idx = next((i for i, p in enumerate(projects) if p['id'] == project_id), None)

    if project_idx is None:
        return jsonify({'error': 'Project not found'}), 404

    project = projects[project_idx]

    # Update text fields
    project['name_en'] = request.form.get('name_en', project['name_en']).strip()
    project['name_ar'] = request.form.get('name_ar', project['name_ar']).strip()
    project['description_en'] = request.form.get('description_en', project['description_en']).strip()
    project['description_ar'] = request.form.get('description_ar', project['description_ar']).strip()
    project['url'] = request.form.get('url', project['url']).strip()
    project['category'] = request.form.get('category', project['category']).strip()

    is_private = request.form.get('is_private', str(project.get('is_private', False))).lower() == 'true'
    project['is_private'] = is_private

    if is_private:
        pwd = request.form.get('password', '').strip()
        if pwd:
            project['password'] = pwd
        project['password_hint'] = request.form.get('password_hint', project.get('password_hint', '')).strip()
    else:
        project['password'] = ''
        project['password_hint'] = ''

    # Handle image upload (only if new image provided)
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            # Delete old image
            if project.get('image'):
                old_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', project['image'])
                if os.path.exists(old_path):
                    try:
                        os.remove(old_path)
                    except OSError:
                        pass

            ext = file.filename.rsplit('.', 1)[1].lower()
            filename = f"{uuid.uuid4().hex}.{ext}"
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            project['image'] = f"uploads/{filename}"

    project['updated_at'] = datetime.utcnow().isoformat()
    projects[project_idx] = project
    save_projects(projects)

    return jsonify(project)


@app.route('/api/admin/projects/<project_id>', methods=['DELETE'])
@admin_required
def delete_project(project_id):
    """Delete a project."""
    projects = load_projects()
    project = next((p for p in projects if p['id'] == project_id), None)

    if not project:
        return jsonify({'error': 'Project not found'}), 404

    # Delete image file
    if project.get('image'):
        image_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', project['image'])
        if os.path.exists(image_path):
            try:
                os.remove(image_path)
            except OSError:
                pass

    projects = [p for p in projects if p['id'] != project_id]
    save_projects(projects)

    return jsonify({'success': True})


# ─── Run ─────────────────────────────────────────────────────────

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    app.run(host='0.0.0.0', port=5100, debug=True)
