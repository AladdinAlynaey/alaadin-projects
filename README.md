<div align="center">

# 🚀 Alaadin's Projects

### Transforming Ideas Into Intelligent Solutions — AI, Data & Beyond


[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com)

---

*I'm **Alaadin Alynaey** — an AI Specialist & Data Engineer with expertise in machine learning, RAG systems, deep learning, and big data analytics. This is my **personal project portfolio** — a beautifully designed, bilingual gallery where I curate and showcase every project I build, from AI-powered chatbots and document-to-podcast converters to ETL pipelines and cybersecurity tools.*

*Built with Flask, powered by JSON, and designed to be stunning.*

[🌐 Visit My Portfolio](https://alaadin-alynaey.site/) · [💼 LinkedIn](https://www.linkedin.com/in/alaadin-alynaey/)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Dual Themes** | Dark (glassmorphism) & Light mode — persisted in localStorage |
| 🌍 **Bilingual (EN/AR)** | Full English + Arabic support with automatic RTL layout |
| 🔍 **Smart Search** | Real-time fuzzy search across both languages |
| � **Sort Projects** | Sort by newest, oldest, name A→Z, or name Z→A |
| �📂 **35+ Categories** | AI, ML, NLP, RAG, Cybersecurity, Data Engineering, and more — each with an FA icon |
| � **Dynamic Categories** | Full CRUD category management from admin panel |
| �🖼️ **Card & List Views** | Toggle between grid and compact list layouts |
| 🔒 **Private Projects** | Password-protect sensitive projects with optional hints |
| 🛡️ **Admin Panel** | Full CRUD dashboard with stats, image uploads, and privacy controls |
| 🔑 **Change Password** | Change admin password from settings gear — persisted in config.json |
| ⏳ **Upload Feedback** | Save button shows spinner during image upload |
| ✏️ **Description Limit** | Live character countdown (120 max) on description fields |
| 🌊 **Animated Wave** | Multi-layer SVG wave with smooth CSS animations |
| 📦 **JSON Storage** | No database needed — all data in one JSON file |
| 🎯 **Premium Design** | Micro-animations, gradients, hover effects, glassmorphism cards |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+

### Installation

```bash
# Clone the repository
git clone https://github.com/AladdinAlynaey/alaadin-projects.git
cd alaadin-projects

# Create virtual environment
python3 -m venv venv
source venv/bin/activate    # Linux/Mac
# venv\Scripts\activate     # Windows

# Install dependencies
pip install flask

# Run the app
python app.py
```

🌐 Open **http://localhost:5100** in your browser.

---

## 🔐 Admin Access

| Setting | Default | Environment Variable |
|---------|---------|---------------------|
| Admin Password | `admin123` | `ADMIN_PASSWORD` |
| Secret Key | Auto-generated | `SECRET_KEY` |

```bash
# Change admin password (recommended)
export ADMIN_PASSWORD=your_secure_password
python app.py
```

---

## 📁 Project Structure

```
alaadin-projects/
├── app.py                     # Flask backend (API routes & CRUD logic)
├── data/
│   ├── projects.json          # JSON data storage
│   ├── categories.json        # Dynamic category definitions
│   └── config.json            # Admin config (password, gitignored)
├── static/
│   ├── css/style.css          # Themes, animations, RTL, responsive design
│   ├── js/app.js              # Frontend logic (search, sort, filters, admin)
│   ├── imgs/favicon.png       # App icon
│   └── uploads/               # Project image uploads
├── templates/
│   ├── index.html             # Public gallery page
│   └── admin.html             # Admin dashboard
└── README.md
```

---

## 🛠️ API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | List public projects |
| `GET` | `/api/categories` | Get active categories (with FA icons) |
| `POST` | `/api/verify-password/:id` | Verify private project password |

### Admin (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Login |
| `POST` | `/api/admin/change-password` | Change admin password |
| `GET` | `/api/admin/projects` | List all projects |
| `POST` | `/api/admin/projects` | Create project |
| `PUT` | `/api/admin/projects/:id` | Update project |
| `DELETE` | `/api/admin/projects/:id` | Delete project |
| `GET` | `/api/categories` | List all categories |
| `POST` | `/api/admin/categories` | Add category |
| `DELETE` | `/api/admin/categories/:key` | Delete category |

---

## 📂 35+ Project Categories

Every category comes with its own **Font Awesome** icon, making the dropdown rich and scannable:

| Icon | Category | Icon | Category | Icon | Category |
|:----:|----------|:----:|----------|:----:|----------|
| 🌐 | Web | 🧠 | AI / ML | 🤖 | Machine Learning |
| 🔬 | Deep Learning | 🗣️ | NLP | 👁️ | Computer Vision |
| 📖 | RAG | 💬 | LLM | 🤖 | Chatbot |
| 🗄️ | Data Engineering | 📊 | Data Science | 📈 | Analytics |
| 🔄 | ETL Pipeline | 🕷️ | Web Scraping | ⚙️ | Automation |
| 🛡️ | Cybersecurity | 🔌 | API | ☁️ | Cloud |
| 🖥️ | DevOps | 📡 | IoT | 🔗 | Blockchain |
| 🎮 | Games | 🎓 | Education | ➗ | Mathematics |
| 🎙️ | Podcast | 🎬 | Media | 📹 | Video |
| 🎧 | Audio | 🔧 | Tools | 🧰 | Utility |
| 📊 | Dashboard | 🛒 | E-Commerce | 💰 | Finance |
| ❤️ | Health | 👥 | Social | ⚡ | Productivity |
| 🧩 | Extension | 🔶 | Other | | |

---

## 🎨 Design Philosophy

- **Glassmorphism** — Frosted glass cards with backdrop blur
- **Gradient Accents** — Cyan-to-violet on buttons, badges, and titles
- **Animated Wave** — 3-layer SVG wave with independent CSS animations
- **Custom Dropdown** — Themed, scrollable dropdown with FA icons (no native select)
- **Micro-Animations** — Card entrance, hover transforms, modal transitions, toast notifications
- **RTL Support** — Perfect right-to-left for Arabic
- **Responsive** — From mobile to ultrawide

---

## 👨‍💻 About Me

I'm **Alaadin Alynaey**, an AI Specialist & Data Engineer currently working at **DeepSafer**, where I lead AI initiatives in data engineering and RAG-based systems. My background spans:

- 🧠 **AI & Machine Learning** — RAG, LLMs, deep learning, computer vision
- 📊 **Data Engineering** — ETL pipelines, big data analytics, cloud tools
- 🎓 **Education** — Former mathematics teacher & AI trainer
- 🔒 **Cybersecurity** — AI-powered security tools

**Featured projects include:** DocsPodcast (document-to-podcast), CyberMind (AI cybersecurity assistant), RAG Q&A systems, emotion detection, smart web scraping, and more.

🌐 **Portfolio:** [alaadin-alynaey.site](https://alaadin-alynaey.site/)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by [Alaadin Alynaey](https://alaadin-alynaey.site)**

⭐ Star this repo if you find it useful!

</div>
