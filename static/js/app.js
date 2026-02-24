/**
 * Project Hub — Frontend Logic
 * Theme, Language, Search, Filter, Admin CRUD, Password Gate
 */

(function () {
    'use strict';

    // ─── Category icon map (FA classes) ────────────────────
    const CATEGORY_ICONS = {
        web: 'fa-solid fa-globe',
        mobile: 'fa-solid fa-mobile-screen',
        desktop: 'fa-solid fa-desktop',
        ai: 'fa-solid fa-brain',
        ml: 'fa-solid fa-robot',
        deeplearning: 'fa-solid fa-network-wired',
        nlp: 'fa-solid fa-language',
        cv: 'fa-solid fa-eye',
        rag: 'fa-solid fa-book-open',
        llm: 'fa-solid fa-comments',
        chatbot: 'fa-solid fa-message',
        data: 'fa-solid fa-database',
        datascience: 'fa-solid fa-chart-line',
        analytics: 'fa-solid fa-chart-pie',
        etl: 'fa-solid fa-arrows-spin',
        scraping: 'fa-solid fa-spider',
        automation: 'fa-solid fa-gears',
        cybersecurity: 'fa-solid fa-shield-halved',
        api: 'fa-solid fa-plug',
        cloud: 'fa-solid fa-cloud',
        devops: 'fa-solid fa-server',
        iot: 'fa-solid fa-microchip',
        blockchain: 'fa-solid fa-link',
        game: 'fa-solid fa-gamepad',
        education: 'fa-solid fa-graduation-cap',
        math: 'fa-solid fa-square-root-variable',
        podcast: 'fa-solid fa-podcast',
        media: 'fa-solid fa-photo-film',
        video: 'fa-solid fa-video',
        audio: 'fa-solid fa-headphones',
        tool: 'fa-solid fa-wrench',
        utility: 'fa-solid fa-toolbox',
        dashboard: 'fa-solid fa-gauge-high',
        ecommerce: 'fa-solid fa-cart-shopping',
        finance: 'fa-solid fa-coins',
        health: 'fa-solid fa-heart-pulse',
        social: 'fa-solid fa-users',
        productivity: 'fa-solid fa-bolt',
        extension: 'fa-solid fa-puzzle-piece',
        other: 'fa-solid fa-shapes',
    };

    const CATEGORY_LABELS = {
        web: { en: 'Web', ar: 'ويب' },
        mobile: { en: 'Mobile', ar: 'جوال' },
        desktop: { en: 'Desktop', ar: 'سطح المكتب' },
        ai: { en: 'AI / ML', ar: 'ذكاء اصطناعي' },
        ml: { en: 'Machine Learning', ar: 'تعلم الآلة' },
        deeplearning: { en: 'Deep Learning', ar: 'تعلم عميق' },
        nlp: { en: 'NLP', ar: 'معالجة اللغة' },
        cv: { en: 'Computer Vision', ar: 'رؤية حاسوبية' },
        rag: { en: 'RAG', ar: 'توليد معزز' },
        llm: { en: 'LLM', ar: 'نماذج لغوية' },
        chatbot: { en: 'Chatbot', ar: 'روبوت محادثة' },
        data: { en: 'Data Engineering', ar: 'هندسة بيانات' },
        datascience: { en: 'Data Science', ar: 'علوم بيانات' },
        analytics: { en: 'Analytics', ar: 'تحليلات' },
        etl: { en: 'ETL Pipeline', ar: 'خط بيانات' },
        scraping: { en: 'Web Scraping', ar: 'استخراج بيانات' },
        automation: { en: 'Automation', ar: 'أتمتة' },
        cybersecurity: { en: 'Cybersecurity', ar: 'أمن سيبراني' },
        api: { en: 'API', ar: 'واجهة برمجة' },
        cloud: { en: 'Cloud', ar: 'سحابة' },
        devops: { en: 'DevOps', ar: 'ديف أوبس' },
        iot: { en: 'IoT', ar: 'إنترنت الأشياء' },
        blockchain: { en: 'Blockchain', ar: 'بلوكتشين' },
        game: { en: 'Games', ar: 'ألعاب' },
        education: { en: 'Education', ar: 'تعليم' },
        math: { en: 'Mathematics', ar: 'رياضيات' },
        podcast: { en: 'Podcast', ar: 'بودكاست' },
        media: { en: 'Media', ar: 'وسائط' },
        video: { en: 'Video', ar: 'فيديو' },
        audio: { en: 'Audio', ar: 'صوتيات' },
        tool: { en: 'Tools', ar: 'أدوات' },
        utility: { en: 'Utility', ar: 'خدمات' },
        dashboard: { en: 'Dashboard', ar: 'لوحة تحكم' },
        ecommerce: { en: 'E-Commerce', ar: 'تجارة إلكترونية' },
        finance: { en: 'Finance', ar: 'مالية' },
        health: { en: 'Health', ar: 'صحة' },
        social: { en: 'Social', ar: 'اجتماعي' },
        productivity: { en: 'Productivity', ar: 'إنتاجية' },
        extension: { en: 'Extension', ar: 'إضافة' },
        other: { en: 'Other', ar: 'أخرى' },
    };

    // ─── State ─────────────────────────────────────────────
    const state = {
        lang: localStorage.getItem('hub-lang') || 'en',
        theme: localStorage.getItem('hub-theme') || 'dark',
        view: localStorage.getItem('hub-view') || 'grid',
        projects: [],
        isAdmin: false,
        editingProjectId: null,
        selectedCategory: 'all',
    };

    const isAdminPage = document.body.classList.contains('admin-body');

    // ─── Init ──────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(state.theme);
        applyLang(state.lang);

        if (isAdminPage) {
            initAdmin();
        } else {
            initPublic();
        }
    });

    // ═══════════════════════════════════════════════════════
    // THEME
    // ═══════════════════════════════════════════════════════

    function applyTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('hub-theme', theme);
    }

    function toggleTheme() {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    }

    // ═══════════════════════════════════════════════════════
    // LANGUAGE
    // ═══════════════════════════════════════════════════════

    function applyLang(lang) {
        state.lang = lang;
        localStorage.setItem('hub-lang', lang);

        const isAr = lang === 'ar';
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

        // Update all bilingual elements
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        });

        // Update placeholders
        document.querySelectorAll('[data-placeholder-en]').forEach(el => {
            el.placeholder = isAr
                ? el.getAttribute('data-placeholder-ar')
                : el.getAttribute('data-placeholder-en');
        });

        // Update select options
        document.querySelectorAll('select option[data-en]').forEach(opt => {
            opt.textContent = isAr ? opt.getAttribute('data-ar') : opt.getAttribute('data-en');
        });

        // Update lang toggle labels
        const labels = document.querySelectorAll('.lang-label');
        labels.forEach(lbl => {
            lbl.textContent = isAr ? 'English' : 'عربي';
        });
    }

    function toggleLang() {
        applyLang(state.lang === 'en' ? 'ar' : 'en');
        // Re-render projects with correct language
        if (!isAdminPage && state.projects.length) {
            renderProjects(filterProjects());
        }
    }

    // ═══════════════════════════════════════════════════════
    // PUBLIC PAGE
    // ═══════════════════════════════════════════════════════

    function initPublic() {
        // Theme toggle
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

        // Lang toggle
        const langBtn = document.getElementById('langToggle');
        if (langBtn) langBtn.addEventListener('click', () => {
            toggleLang();
            populateCategoryDropdown();  // Re-render items with new lang
        });

        // View toggle
        const viewGrid = document.getElementById('viewGrid');
        const viewList = document.getElementById('viewList');
        if (viewGrid) viewGrid.addEventListener('click', () => setView('grid'));
        if (viewList) viewList.addEventListener('click', () => setView('list'));
        setView(state.view, false);

        // Search
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(() => {
                searchClear.style.display = searchInput.value ? 'block' : 'none';
                renderProjects(filterProjects());
            }, 200));
        }
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                renderProjects(filterProjects());
            });
        }

        // Custom category dropdown
        initCategoryDropdown();

        // Password modal
        initPasswordModal();

        // Load projects
        loadPublicProjects();
    }

    // ─── Custom Category Dropdown ─────────────────────────
    function initCategoryDropdown() {
        const dropdown = document.getElementById('categoryDropdown');
        const trigger = document.getElementById('categoryTrigger');
        const menu = document.getElementById('categoryMenu');
        if (!dropdown || !trigger || !menu) return;

        // Toggle open/close
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', () => {
            dropdown.classList.remove('open');
        });
        menu.addEventListener('click', (e) => e.stopPropagation());

        // Item click handler (delegated)
        menu.addEventListener('click', (e) => {
            const item = e.target.closest('.custom-dropdown__item');
            if (!item) return;

            state.selectedCategory = item.dataset.value;
            // Update active state
            menu.querySelectorAll('.custom-dropdown__item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update trigger label
            const label = document.getElementById('categoryLabel');
            const isAr = state.lang === 'ar';
            if (state.selectedCategory === 'all') {
                label.textContent = isAr ? 'جميع الفئات' : 'All Categories';
            } else {
                const lb = CATEGORY_LABELS[state.selectedCategory];
                label.textContent = lb ? (isAr ? lb.ar : lb.en) : state.selectedCategory;
            }

            dropdown.classList.remove('open');
            renderProjects(filterProjects());
        });
    }

    async function populateCategoryDropdown() {
        const menu = document.getElementById('categoryMenu');
        if (!menu) return;

        const isAr = state.lang === 'ar';

        try {
            const res = await fetch('/api/categories');
            const cats = await res.json();  // e.g. ['ai','web']

            // Build HTML — always keep "All" at top
            let html = `<div class="custom-dropdown__item ${state.selectedCategory === 'all' ? 'active' : ''}" data-value="all">
                <i class="fa-solid fa-border-all"></i>
                <span>${isAr ? 'جميع الفئات' : 'All Categories'}</span>
            </div>`;

            for (const cat of cats) {
                const icon = CATEGORY_ICONS[cat] || 'fa-solid fa-folder';
                const lb = CATEGORY_LABELS[cat];
                const label = lb ? (isAr ? lb.ar : lb.en) : cat;
                html += `<div class="custom-dropdown__item ${state.selectedCategory === cat ? 'active' : ''}" data-value="${cat}">
                    <i class="${icon}"></i>
                    <span>${label}</span>
                </div>`;
            }

            menu.innerHTML = html;
        } catch (err) {
            console.error('Failed to load categories:', err);
        }
    }

    async function loadPublicProjects() {
        const loading = document.getElementById('loadingState');
        const empty = document.getElementById('emptyState');
        const grid = document.getElementById('projectsGrid');

        try {
            const res = await fetch('/api/projects');
            state.projects = await res.json();
            loading.style.display = 'none';
            renderProjects(state.projects);
            updateStats();
            populateCategoryDropdown();
        } catch (err) {
            loading.style.display = 'none';
            empty.style.display = 'block';
            console.error('Failed to load projects:', err);
        }
    }

    function filterProjects() {
        const search = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
        const category = state.selectedCategory || 'all';

        return state.projects.filter(p => {
            // Category filter
            if (category !== 'all' && p.category !== category) return false;

            // Search filter (fuzzy across both languages)
            if (search) {
                const fields = [
                    p.name_en, p.name_ar,
                    p.description_en, p.description_ar,
                    p.category, p.url
                ].map(f => (f || '').toLowerCase());

                // Split search into terms for smart matching
                const terms = search.split(/\s+/);
                return terms.every(term =>
                    fields.some(field => field.includes(term))
                );
            }

            return true;
        });
    }

    function renderProjects(projects) {
        const grid = document.getElementById('projectsGrid');
        const empty = document.getElementById('emptyState');

        if (!projects.length) {
            grid.innerHTML = '';
            empty.style.display = 'block';
            return;
        }
        empty.style.display = 'none';

        const isAr = state.lang === 'ar';

        grid.innerHTML = projects.map(p => {
            const name = isAr && p.name_ar ? p.name_ar : p.name_en;
            const desc = isAr && p.description_ar ? p.description_ar : p.description_en;
            const lb = CATEGORY_LABELS[p.category];
            const catLabel = lb ? (isAr ? lb.ar : lb.en) : p.category;
            const dateStr = p.created_at ? new Date(p.created_at).toLocaleDateString(isAr ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

            const imageHtml = p.image
                ? `<img src="/static/${p.image}" alt="${name}" class="project-card__image" loading="lazy">`
                : `<div class="project-card__no-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;

            const lockHtml = p.is_private
                ? `<div class="project-card__lock"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>`
                : '';

            const linkLabel = isAr ? 'زيارة' : 'Visit';
            const linkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

            const githubBtn = p.github_url
                ? `<a class="project-card__github" href="${p.github_url}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="GitHub"><i class="fa-brands fa-github"></i></a>`
                : '';

            return `
                <div class="project-card" data-id="${p.id}">
                    <div class="project-card__image-wrap">
                        ${imageHtml}
                        <div class="project-card__overlay"></div>
                        <div class="project-card__badges">
                            <span class="project-card__category">${catLabel}</span>
                            ${lockHtml}
                        </div>
                    </div>
                    <div class="project-card__body">
                        <h3 class="project-card__name">${escapeHtml(name)}</h3>
                        <p class="project-card__desc">${escapeHtml(desc || '')}</p>
                        <div class="project-card__footer">
                            <span class="project-card__date">${dateStr}</span>
                            <div class="project-card__actions">
                                ${githubBtn}
                                <button class="project-card__link" onclick="event.stopPropagation(); window.hubOpenProject('${p.id}')" aria-label="${linkLabel}">
                                    ${linkLabel} ${linkIcon}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Click on card to open project
        grid.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                window.hubOpenProject(card.dataset.id);
            });
        });
    }

    function updateStats() {
        const total = document.getElementById('statTotal');
        const cats = document.getElementById('statCategories');
        if (total) total.textContent = state.projects.length;
        if (cats) {
            const uniqueCats = new Set(state.projects.map(p => p.category));
            cats.textContent = uniqueCats.size;
        }
    }

    function setView(view, rerender = true) {
        state.view = view;
        localStorage.setItem('hub-view', view);

        const grid = document.getElementById('projectsGrid');
        const viewGrid = document.getElementById('viewGrid');
        const viewList = document.getElementById('viewList');

        if (!grid) return;

        if (view === 'list') {
            grid.classList.add('list-view');
            viewList?.classList.add('active');
            viewGrid?.classList.remove('active');
        } else {
            grid.classList.remove('list-view');
            viewGrid?.classList.add('active');
            viewList?.classList.remove('active');
        }
    }

    // ═══════════════════════════════════════════════════════
    // PASSWORD MODAL
    // ═══════════════════════════════════════════════════════

    function initPasswordModal() {
        const modal = document.getElementById('passwordModal');
        const closeBtn = document.getElementById('modalClose');
        const form = document.getElementById('passwordForm');
        const toggleVis = document.getElementById('togglePasswordVisibility');

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

        if (toggleVis) {
            toggleVis.addEventListener('click', () => {
                const input = document.getElementById('passwordInput');
                input.type = input.type === 'password' ? 'text' : 'password';
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const projectId = document.getElementById('passwordProjectId').value;
                const password = document.getElementById('passwordInput').value;
                const errorEl = document.getElementById('passwordError');
                const hintEl = document.getElementById('passwordHint');

                try {
                    const res = await fetch(`/api/verify-password/${projectId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password })
                    });
                    const data = await res.json();

                    if (data.success) {
                        closeModal(modal);
                        window.open(data.url, '_blank');
                    } else {
                        errorEl.style.display = 'block';
                        if (data.hint) {
                            hintEl.style.display = 'block';
                            document.getElementById('hintText').textContent = data.hint;
                        }
                    }
                } catch (err) {
                    errorEl.style.display = 'block';
                }
            });
        }
    }

    // Global function to open project (called from onclick)
    window.hubOpenProject = function (projectId) {
        const project = state.projects.find(p => p.id === projectId);
        if (!project) return;

        if (project.is_private) {
            // Show password modal
            const modal = document.getElementById('passwordModal');
            document.getElementById('passwordProjectId').value = projectId;
            document.getElementById('passwordInput').value = '';
            document.getElementById('passwordError').style.display = 'none';

            const hintEl = document.getElementById('passwordHint');
            if (project.password_hint) {
                hintEl.style.display = 'block';
                document.getElementById('hintText').textContent = project.password_hint;
            } else {
                hintEl.style.display = 'none';
            }

            openModal(modal);
        } else {
            if (project.url) {
                window.open(project.url, '_blank');
            }
        }
    };

    // ═══════════════════════════════════════════════════════
    // ADMIN PAGE
    // ═══════════════════════════════════════════════════════

    function initAdmin() {
        // Theme & lang toggles
        const themeBtn = document.getElementById('adminThemeToggle');
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
        const langBtn = document.getElementById('adminLangToggle');
        if (langBtn) langBtn.addEventListener('click', () => {
            toggleLang();
            if (state.isAdmin) loadAdminProjects();
        });

        // Login form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = document.getElementById('adminPasswordInput').value;
                const errorEl = document.getElementById('loginError');

                try {
                    const res = await fetch('/api/admin/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password })
                    });
                    const data = await res.json();

                    if (data.success) {
                        state.isAdmin = true;
                        showAdminDash();
                        loadAdminProjects();
                    } else {
                        errorEl.style.display = 'block';
                        setTimeout(() => errorEl.style.display = 'none', 3000);
                    }
                } catch (err) {
                    errorEl.style.display = 'block';
                }
            });
        }

        // Logout
        const logoutBtn = document.getElementById('adminLogout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                state.isAdmin = false;
                showAdminLogin();
            });
        }

        // Add project button
        const addBtn = document.getElementById('addProjectBtn');
        if (addBtn) addBtn.addEventListener('click', () => openProjectModal());

        // Project form
        initProjectForm();
        initDeleteModal();

        // Check if already logged in
        checkAdminSession();
    }

    async function checkAdminSession() {
        try {
            const res = await fetch('/api/admin/check');
            const data = await res.json();
            if (data.is_admin) {
                state.isAdmin = true;
                showAdminDash();
                loadAdminProjects();
            }
        } catch (err) {
            // Not logged in
        }
    }

    function showAdminDash() {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDash').style.display = 'block';
    }

    function showAdminLogin() {
        document.getElementById('adminLogin').style.display = 'flex';
        document.getElementById('adminDash').style.display = 'none';
        document.getElementById('adminPasswordInput').value = '';
    }

    async function loadAdminProjects() {
        try {
            const res = await fetch('/api/admin/projects');
            state.projects = await res.json();
            renderAdminTable();
            updateAdminStats();
        } catch (err) {
            console.error('Failed to load admin projects:', err);
        }
    }

    function updateAdminStats() {
        const total = document.getElementById('adminStatTotal');
        const pub = document.getElementById('adminStatPublic');
        const priv = document.getElementById('adminStatPrivate');

        if (total) total.textContent = state.projects.length;
        if (pub) pub.textContent = state.projects.filter(p => !p.is_private).length;
        if (priv) priv.textContent = state.projects.filter(p => p.is_private).length;
    }

    function renderAdminTable() {
        const tbody = document.getElementById('adminTableBody');
        const emptyDiv = document.getElementById('adminEmpty');
        const table = document.getElementById('adminTable');

        if (!state.projects.length) {
            table.style.display = 'none';
            emptyDiv.style.display = 'block';
            return;
        }

        table.style.display = 'table';
        emptyDiv.style.display = 'none';

        const isAr = state.lang === 'ar';

        tbody.innerHTML = state.projects.map(p => {
            const name = isAr && p.name_ar ? p.name_ar : p.name_en;
            const lb = CATEGORY_LABELS[p.category];
            const catLabel = lb ? (isAr ? lb.ar : lb.en) : p.category;
            const statusLabel = p.is_private ? (isAr ? 'خاص' : 'Private') : (isAr ? 'عام' : 'Public');
            const statusClass = p.is_private ? 'private' : 'public';
            const dateStr = p.created_at ? new Date(p.created_at).toLocaleDateString(isAr ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

            const thumbHtml = p.image
                ? `<img src="/static/${p.image}" class="admin-table__thumb" alt="${escapeHtml(name)}">`
                : `<div class="admin-table__no-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`;

            return `
                <tr>
                    <td>${thumbHtml}</td>
                    <td class="admin-table__name">${escapeHtml(name)}</td>
                    <td><span class="admin-table__badge admin-table__badge--category">${catLabel}</span></td>
                    <td><span class="admin-table__badge admin-table__badge--${statusClass}">${statusLabel}</span></td>
                    <td>${dateStr}</td>
                    <td>
                        <div class="admin-table__actions">
                            <button class="admin-table__btn admin-table__btn--edit" onclick="window.hubEditProject('${p.id}')" title="Edit">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="admin-table__btn admin-table__btn--delete" onclick="window.hubDeleteProject('${p.id}')" title="Delete">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ─── Project Form (Add/Edit) ────────────────────────────

    function initProjectForm() {
        const modal = document.getElementById('projectModal');
        const closeBtn = document.getElementById('projectModalClose');
        const cancelBtn = document.getElementById('projectFormCancel');
        const form = document.getElementById('projectForm');
        const privToggle = document.getElementById('isPrivate');
        const imageInput = document.getElementById('projectImage');

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        if (cancelBtn) cancelBtn.addEventListener('click', () => closeModal(modal));
        if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

        // Toggle privacy fields
        if (privToggle) {
            privToggle.addEventListener('change', () => {
                const show = privToggle.checked;
                document.querySelectorAll('.privacy-fields').forEach(el => {
                    el.style.display = show ? 'block' : 'none';
                });
            });
        }

        // Image preview
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        const preview = document.getElementById('imagePreview');
                        const placeholder = document.getElementById('imagePlaceholder');
                        preview.src = ev.target.result;
                        preview.style.display = 'block';
                        placeholder.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Submit form
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData();

                formData.append('name_en', document.getElementById('nameEn').value);
                formData.append('name_ar', document.getElementById('nameAr').value);
                formData.append('description_en', document.getElementById('descEn').value);
                formData.append('description_ar', document.getElementById('descAr').value);
                formData.append('url', document.getElementById('projectUrl').value);
                formData.append('github_url', document.getElementById('projectGithubUrl').value);
                formData.append('category', document.getElementById('projectCategory').value);
                formData.append('is_private', document.getElementById('isPrivate').checked);
                formData.append('password', document.getElementById('projectPassword').value);
                formData.append('password_hint', document.getElementById('projectPasswordHint').value);

                const imageFile = document.getElementById('projectImage').files[0];
                if (imageFile) formData.append('image', imageFile);

                const projectId = document.getElementById('projectId').value;
                const url = projectId
                    ? `/api/admin/projects/${projectId}`
                    : '/api/admin/projects';
                const method = projectId ? 'PUT' : 'POST';

                try {
                    const res = await fetch(url, { method, body: formData });
                    if (res.ok) {
                        closeModal(modal);
                        loadAdminProjects();
                        showToast(
                            state.lang === 'ar'
                                ? (projectId ? 'تم تحديث المشروع بنجاح' : 'تم إضافة المشروع بنجاح')
                                : (projectId ? 'Project updated successfully' : 'Project added successfully'),
                            'success'
                        );
                    } else {
                        const data = await res.json();
                        showToast(data.error || 'Error saving project', 'error');
                    }
                } catch (err) {
                    showToast('Network error', 'error');
                }
            });
        }
    }

    function openProjectModal(project = null) {
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('projectModalTitle');

        // Reset form
        document.getElementById('projectForm').reset();
        document.getElementById('projectId').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('imagePlaceholder').style.display = 'flex';
        document.querySelectorAll('.privacy-fields').forEach(el => el.style.display = 'none');

        if (project) {
            state.editingProjectId = project.id;
            title.textContent = state.lang === 'ar' ? 'تعديل المشروع' : 'Edit Project';
            title.setAttribute('data-en', 'Edit Project');
            title.setAttribute('data-ar', 'تعديل المشروع');
            document.getElementById('projectFormSubmit').textContent = state.lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes';

            document.getElementById('projectId').value = project.id;
            document.getElementById('nameEn').value = project.name_en || '';
            document.getElementById('nameAr').value = project.name_ar || '';
            document.getElementById('descEn').value = project.description_en || '';
            document.getElementById('descAr').value = project.description_ar || '';
            document.getElementById('projectUrl').value = project.url || '';
            document.getElementById('projectGithubUrl').value = project.github_url || '';
            document.getElementById('projectCategory').value = project.category || 'other';
            document.getElementById('isPrivate').checked = project.is_private || false;
            document.getElementById('projectPassword').value = project.password || '';
            document.getElementById('projectPasswordHint').value = project.password_hint || '';

            if (project.is_private) {
                document.querySelectorAll('.privacy-fields').forEach(el => el.style.display = 'block');
            }

            if (project.image) {
                const preview = document.getElementById('imagePreview');
                preview.src = `/static/${project.image}`;
                preview.style.display = 'block';
                document.getElementById('imagePlaceholder').style.display = 'none';
            }
        } else {
            state.editingProjectId = null;
            title.textContent = state.lang === 'ar' ? 'إضافة مشروع' : 'Add Project';
            title.setAttribute('data-en', 'Add Project');
            title.setAttribute('data-ar', 'إضافة مشروع');
            document.getElementById('projectFormSubmit').textContent = state.lang === 'ar' ? 'حفظ المشروع' : 'Save Project';
        }

        openModal(modal);
    }

    window.hubEditProject = function (projectId) {
        const project = state.projects.find(p => p.id === projectId);
        if (project) openProjectModal(project);
    };

    // ─── Delete Modal ───────────────────────────────────────

    function initDeleteModal() {
        const modal = document.getElementById('deleteModal');
        const cancelBtn = document.getElementById('deleteCancelBtn');
        const confirmBtn = document.getElementById('deleteConfirmBtn');

        if (cancelBtn) cancelBtn.addEventListener('click', () => closeModal(modal));
        if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

        if (confirmBtn) {
            confirmBtn.addEventListener('click', async () => {
                const projectId = document.getElementById('deleteProjectId').value;
                try {
                    const res = await fetch(`/api/admin/projects/${projectId}`, { method: 'DELETE' });
                    if (res.ok) {
                        closeModal(modal);
                        loadAdminProjects();
                        showToast(
                            state.lang === 'ar' ? 'تم حذف المشروع' : 'Project deleted',
                            'success'
                        );
                    }
                } catch (err) {
                    showToast('Error deleting project', 'error');
                }
            });
        }
    }

    window.hubDeleteProject = function (projectId) {
        const modal = document.getElementById('deleteModal');
        document.getElementById('deleteProjectId').value = projectId;
        openModal(modal);
    };

    // ═══════════════════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════════════════

    function openModal(modal) {
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

})();
