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

    // ─── FA Icons Library (for icon picker) ────────────────
    const FA_ICONS = [
        // AI & Machine Learning
        ['fa-solid fa-brain', 'brain ai ml intelligence think'],
        ['fa-solid fa-robot', 'robot machine learning bot automation'],
        ['fa-solid fa-network-wired', 'network deep learning neural'],
        ['fa-solid fa-microchip', 'chip cpu processor iot hardware'],
        ['fa-solid fa-memory', 'memory ram hardware'],
        ['fa-solid fa-code-branch', 'code branch version git'],
        ['fa-solid fa-diagram-project', 'diagram project workflow'],
        ['fa-solid fa-sitemap', 'sitemap structure hierarchy'],
        // Language & NLP
        ['fa-solid fa-language', 'language nlp translate'],
        ['fa-solid fa-spell-check', 'spell check text nlp'],
        ['fa-solid fa-font', 'font text typography'],
        ['fa-solid fa-quote-left', 'quote text speech'],
        ['fa-solid fa-comments', 'comments chat conversation llm'],
        ['fa-solid fa-comment-dots', 'comment chat message'],
        ['fa-solid fa-message', 'message chat chatbot'],
        // Vision & Eyes
        ['fa-solid fa-eye', 'eye vision see view cv'],
        ['fa-solid fa-camera', 'camera photo image vision'],
        ['fa-solid fa-image', 'image photo picture'],
        ['fa-solid fa-images', 'images photos gallery'],
        ['fa-solid fa-panorama', 'panorama image wide'],
        // Data & Database
        ['fa-solid fa-database', 'database data storage sql'],
        ['fa-solid fa-server', 'server hosting devops'],
        ['fa-solid fa-hard-drive', 'hard drive storage disk'],
        ['fa-solid fa-chart-line', 'chart line graph analytics data'],
        ['fa-solid fa-chart-bar', 'chart bar graph analytics'],
        ['fa-solid fa-chart-pie', 'chart pie analytics statistics'],
        ['fa-solid fa-chart-area', 'chart area graph'],
        ['fa-solid fa-chart-column', 'chart column bar'],
        ['fa-solid fa-chart-simple', 'chart simple minimal'],
        ['fa-solid fa-table', 'table data grid spreadsheet'],
        ['fa-solid fa-table-cells', 'table cells data grid'],
        ['fa-solid fa-filter', 'filter sort data'],
        ['fa-solid fa-magnifying-glass-chart', 'search analytics data'],
        // Arrows & Flow
        ['fa-solid fa-arrows-spin', 'arrows spin etl process cycle'],
        ['fa-solid fa-arrow-right-arrow-left', 'arrow exchange transfer'],
        ['fa-solid fa-rotate', 'rotate refresh sync'],
        ['fa-solid fa-shuffle', 'shuffle random mix'],
        ['fa-solid fa-right-left', 'exchange swap transfer'],
        // Web & Internet
        ['fa-solid fa-globe', 'globe web world internet'],
        ['fa-solid fa-earth-americas', 'earth globe americas world'],
        ['fa-solid fa-earth-europe', 'earth globe europe world'],
        ['fa-solid fa-wifi', 'wifi wireless internet'],
        ['fa-solid fa-signal', 'signal wireless network'],
        ['fa-solid fa-rss', 'rss feed blog'],
        ['fa-solid fa-link', 'link chain url blockchain'],
        ['fa-solid fa-unlink', 'unlink broken disconnect'],
        // Mobile & Desktop
        ['fa-solid fa-mobile-screen', 'mobile phone app'],
        ['fa-solid fa-tablet-screen-button', 'tablet device mobile'],
        ['fa-solid fa-laptop', 'laptop computer portable'],
        ['fa-solid fa-desktop', 'desktop computer monitor screen'],
        ['fa-solid fa-display', 'display screen monitor'],
        ['fa-solid fa-tv', 'tv television screen'],
        // Code & Development
        ['fa-solid fa-code', 'code programming development'],
        ['fa-solid fa-terminal', 'terminal console command cli'],
        ['fa-solid fa-file-code', 'file code programming'],
        ['fa-solid fa-bug', 'bug debug error testing'],
        ['fa-solid fa-vial', 'vial test lab experiment'],
        ['fa-solid fa-flask', 'flask lab science experiment'],
        ['fa-solid fa-microscope', 'microscope science research'],
        ['fa-solid fa-atom', 'atom science physics'],
        ['fa-solid fa-dna', 'dna biology genetics science'],
        // Security & Privacy
        ['fa-solid fa-shield-halved', 'shield security protection cyber'],
        ['fa-solid fa-shield', 'shield security defense'],
        ['fa-solid fa-lock', 'lock security password private'],
        ['fa-solid fa-unlock', 'unlock open access'],
        ['fa-solid fa-key', 'key password security access auth'],
        ['fa-solid fa-fingerprint', 'fingerprint biometric security identity'],
        ['fa-solid fa-user-shield', 'user shield security protection'],
        ['fa-solid fa-user-lock', 'user lock security private'],
        ['fa-solid fa-virus', 'virus malware security threat'],
        ['fa-solid fa-skull-crossbones', 'skull danger hack security'],
        ['fa-solid fa-mask', 'mask privacy anonymous'],
        // Cloud
        ['fa-solid fa-cloud', 'cloud hosting saas'],
        ['fa-solid fa-cloud-arrow-up', 'cloud upload deploy'],
        ['fa-solid fa-cloud-arrow-down', 'cloud download'],
        // Tools & Settings
        ['fa-solid fa-wrench', 'wrench tool fix repair'],
        ['fa-solid fa-screwdriver-wrench', 'screwdriver wrench tools fix'],
        ['fa-solid fa-toolbox', 'toolbox tools utility kit'],
        ['fa-solid fa-gear', 'gear settings config'],
        ['fa-solid fa-gears', 'gears settings automation'],
        ['fa-solid fa-sliders', 'sliders settings controls config'],
        ['fa-solid fa-hammer', 'hammer build construction tool'],
        // Files & Documents
        ['fa-solid fa-file', 'file document'],
        ['fa-solid fa-file-lines', 'file document text'],
        ['fa-solid fa-file-pdf', 'file pdf document'],
        ['fa-solid fa-file-word', 'file word document office'],
        ['fa-solid fa-file-excel', 'file excel spreadsheet'],
        ['fa-solid fa-file-csv', 'file csv data'],
        ['fa-solid fa-file-zipper', 'file zip archive compress'],
        ['fa-solid fa-file-import', 'file import upload'],
        ['fa-solid fa-file-export', 'file export download'],
        ['fa-solid fa-folder', 'folder directory'],
        ['fa-solid fa-folder-open', 'folder open directory'],
        ['fa-solid fa-copy', 'copy duplicate clipboard'],
        ['fa-solid fa-paste', 'paste clipboard'],
        // Media & Entertainment
        ['fa-solid fa-photo-film', 'photo film media multimedia'],
        ['fa-solid fa-film', 'film movie cinema video'],
        ['fa-solid fa-video', 'video camera record'],
        ['fa-solid fa-play', 'play media start video'],
        ['fa-solid fa-headphones', 'headphones audio music listen'],
        ['fa-solid fa-music', 'music audio sound'],
        ['fa-solid fa-volume-high', 'volume audio sound speaker'],
        ['fa-solid fa-microphone', 'microphone audio record voice'],
        ['fa-solid fa-podcast', 'podcast audio show'],
        ['fa-solid fa-radio', 'radio broadcast audio'],
        ['fa-solid fa-guitar', 'guitar music instrument'],
        ['fa-solid fa-drum', 'drum music instrument beat'],
        // Math & Science
        ['fa-solid fa-square-root-variable', 'math square root variable equation'],
        ['fa-solid fa-calculator', 'calculator math compute'],
        ['fa-solid fa-infinity', 'infinity math symbol'],
        ['fa-solid fa-superscript', 'superscript math power'],
        ['fa-solid fa-subscript', 'subscript math index'],
        ['fa-solid fa-divide', 'divide math operation'],
        ['fa-solid fa-plus', 'plus add math'],
        ['fa-solid fa-minus', 'minus subtract math'],
        ['fa-solid fa-percent', 'percent math statistics'],
        // Education
        ['fa-solid fa-graduation-cap', 'graduation cap education school degree'],
        ['fa-solid fa-school', 'school education building'],
        ['fa-solid fa-chalkboard', 'chalkboard school classroom'],
        ['fa-solid fa-chalkboard-user', 'chalkboard teacher education'],
        ['fa-solid fa-book', 'book reading education knowledge'],
        ['fa-solid fa-book-open', 'book open reading rag'],
        ['fa-solid fa-book-open-reader', 'book reader reading education'],
        ['fa-solid fa-bookmark', 'bookmark save reading'],
        ['fa-solid fa-pen', 'pen write draw design'],
        ['fa-solid fa-pen-nib', 'pen nib write calligraphy'],
        ['fa-solid fa-pencil', 'pencil write edit draw'],
        ['fa-solid fa-highlighter', 'highlighter mark text'],
        // Commerce & Finance
        ['fa-solid fa-cart-shopping', 'cart shopping ecommerce buy'],
        ['fa-solid fa-basket-shopping', 'basket shopping ecommerce'],
        ['fa-solid fa-bag-shopping', 'bag shopping ecommerce'],
        ['fa-solid fa-store', 'store shop ecommerce business'],
        ['fa-solid fa-shop', 'shop store ecommerce business'],
        ['fa-solid fa-coins', 'coins money finance currency'],
        ['fa-solid fa-money-bill', 'money bill cash finance'],
        ['fa-solid fa-credit-card', 'credit card payment finance'],
        ['fa-solid fa-wallet', 'wallet money finance payment'],
        ['fa-solid fa-piggy-bank', 'piggy bank savings finance'],
        ['fa-solid fa-hand-holding-dollar', 'hand holding dollar finance donate'],
        ['fa-solid fa-receipt', 'receipt invoice payment'],
        ['fa-solid fa-cash-register', 'cash register payment pos'],
        // Health & Medical
        ['fa-solid fa-heart-pulse', 'heart pulse health medical'],
        ['fa-solid fa-heart', 'heart love health favorite'],
        ['fa-solid fa-hospital', 'hospital medical health building'],
        ['fa-solid fa-stethoscope', 'stethoscope doctor medical'],
        ['fa-solid fa-syringe', 'syringe medical injection'],
        ['fa-solid fa-pills', 'pills medicine pharmacy'],
        ['fa-solid fa-thermometer', 'thermometer temperature health'],
        ['fa-solid fa-lungs', 'lungs body health respiratory'],
        // Users & People
        ['fa-solid fa-user', 'user person profile account'],
        ['fa-solid fa-users', 'users people group team social'],
        ['fa-solid fa-user-group', 'user group team people'],
        ['fa-solid fa-user-plus', 'user plus add register'],
        ['fa-solid fa-user-gear', 'user gear settings admin'],
        ['fa-solid fa-user-tie', 'user tie business professional'],
        ['fa-solid fa-people-group', 'people group team community'],
        ['fa-solid fa-handshake', 'handshake partnership deal'],
        // Gaming
        ['fa-solid fa-gamepad', 'gamepad game controller play'],
        ['fa-solid fa-dice', 'dice game random chance'],
        ['fa-solid fa-chess', 'chess game strategy board'],
        ['fa-solid fa-trophy', 'trophy award winner prize'],
        ['fa-solid fa-medal', 'medal award achievement'],
        ['fa-solid fa-ranking-star', 'ranking star leaderboard'],
        ['fa-solid fa-puzzle-piece', 'puzzle piece extension addon'],
        // Communication
        ['fa-solid fa-envelope', 'envelope email mail message'],
        ['fa-solid fa-paper-plane', 'paper plane send message'],
        ['fa-solid fa-bell', 'bell notification alert'],
        ['fa-solid fa-phone', 'phone call contact'],
        ['fa-solid fa-calendar', 'calendar date schedule event'],
        ['fa-solid fa-calendar-check', 'calendar check event done'],
        ['fa-solid fa-clock', 'clock time schedule'],
        ['fa-solid fa-stopwatch', 'stopwatch timer speed'],
        // Navigation & Map
        ['fa-solid fa-location-dot', 'location map pin gps'],
        ['fa-solid fa-map', 'map location geography'],
        ['fa-solid fa-compass', 'compass direction navigate'],
        ['fa-solid fa-route', 'route path direction'],
        // Transportation
        ['fa-solid fa-car', 'car vehicle transport drive'],
        ['fa-solid fa-truck', 'truck delivery transport'],
        ['fa-solid fa-plane', 'plane flight travel transport'],
        ['fa-solid fa-rocket', 'rocket launch startup space'],
        ['fa-solid fa-satellite', 'satellite space communication'],
        ['fa-solid fa-satellite-dish', 'satellite dish signal broadcast'],
        ['fa-solid fa-ship', 'ship boat nautical maritime'],
        // UI & Design
        ['fa-solid fa-palette', 'palette color art design'],
        ['fa-solid fa-paint-roller', 'paint roller design decoration'],
        ['fa-solid fa-paintbrush', 'paintbrush art design draw'],
        ['fa-solid fa-crop', 'crop image edit design'],
        ['fa-solid fa-wand-magic-sparkles', 'wand magic sparkle effect'],
        ['fa-solid fa-circle-half-stroke', 'circle half theme contrast'],
        ['fa-solid fa-swatchbook', 'swatch color palette design'],
        ['fa-solid fa-bezier-curve', 'bezier curve vector design'],
        ['fa-solid fa-object-group', 'object group layout design'],
        ['fa-solid fa-layer-group', 'layer group stack'],
        ['fa-solid fa-shapes', 'shapes forms geometry other'],
        ['fa-solid fa-icons', 'icons symbols collection'],
        // Dashboard & Metrics
        ['fa-solid fa-gauge-high', 'gauge dashboard speed metrics'],
        ['fa-solid fa-gauge', 'gauge meter dashboard'],
        ['fa-solid fa-tachograph-digital', 'tachograph digital speed'],
        // Power & Energy
        ['fa-solid fa-bolt', 'bolt lightning energy power speed'],
        ['fa-solid fa-plug', 'plug electric power api connect'],
        ['fa-solid fa-battery-full', 'battery power energy'],
        ['fa-solid fa-solar-panel', 'solar panel energy green'],
        ['fa-solid fa-fire', 'fire hot flame popular trending'],
        ['fa-solid fa-snowflake', 'snowflake cold freeze winter'],
        ['fa-solid fa-sun', 'sun light day weather'],
        ['fa-solid fa-moon', 'moon night dark theme'],
        ['fa-solid fa-star', 'star favorite rate rating'],
        // Building & Construction
        ['fa-solid fa-building', 'building office company business'],
        ['fa-solid fa-house', 'house home building'],
        ['fa-solid fa-industry', 'industry factory manufacturing'],
        ['fa-solid fa-city', 'city buildings urban'],
        ['fa-solid fa-warehouse', 'warehouse storage logistics'],
        // Misc & Symbols
        ['fa-solid fa-circle-info', 'info information help'],
        ['fa-solid fa-circle-question', 'question help support faq'],
        ['fa-solid fa-circle-check', 'check done success verified'],
        ['fa-solid fa-circle-exclamation', 'exclamation warning alert'],
        ['fa-solid fa-triangle-exclamation', 'triangle warning danger alert'],
        ['fa-solid fa-flag', 'flag report mark country'],
        ['fa-solid fa-tag', 'tag label category price'],
        ['fa-solid fa-tags', 'tags labels categories'],
        ['fa-solid fa-qrcode', 'qr code scan barcode'],
        ['fa-solid fa-barcode', 'barcode scan product'],
        ['fa-solid fa-hashtag', 'hashtag tag social media'],
        ['fa-solid fa-at', 'at email contact'],
        ['fa-solid fa-thumbs-up', 'thumbs up like positive'],
        ['fa-solid fa-lightbulb', 'lightbulb idea innovation tip'],
        ['fa-solid fa-list', 'list items todo'],
        ['fa-solid fa-list-check', 'list check todo tasks'],
        ['fa-solid fa-clipboard', 'clipboard copy paste notes'],
        ['fa-solid fa-clipboard-check', 'clipboard check tasks done'],
        ['fa-solid fa-note-sticky', 'note sticky memo'],
        ['fa-solid fa-newspaper', 'newspaper news article media'],
        ['fa-solid fa-box', 'box package shipping'],
        ['fa-solid fa-boxes-stacked', 'boxes stacked inventory'],
        ['fa-solid fa-cube', 'cube 3d object model'],
        ['fa-solid fa-cubes', 'cubes blocks 3d models'],
        ['fa-solid fa-print', 'print printer paper'],
        ['fa-solid fa-expand', 'expand fullscreen maximize resize'],
        ['fa-solid fa-minimize', 'minimize shrink window'],
        ['fa-solid fa-download', 'download save get'],
        ['fa-solid fa-upload', 'upload share send'],
        ['fa-solid fa-share-nodes', 'share social distribute'],
        ['fa-solid fa-share-from-square', 'share external open'],
        ['fa-solid fa-magnifying-glass', 'magnifying glass search find'],
        ['fa-solid fa-crosshairs', 'crosshairs target aim focus'],
        ['fa-solid fa-bullseye', 'bullseye target goal aim'],
        ['fa-solid fa-spider', 'spider web scraping crawl'],
        ['fa-solid fa-life-ring', 'life ring help support rescue'],
        ['fa-solid fa-anchor', 'anchor nautical web'],
        ['fa-solid fa-leaf', 'leaf nature green eco environment'],
        ['fa-solid fa-seedling', 'seedling plant grow nature'],
        ['fa-solid fa-tree', 'tree nature forest environment'],
        ['fa-solid fa-recycle', 'recycle environment green'],
        ['fa-solid fa-paw', 'paw animal pet'],
        ['fa-solid fa-horse', 'horse animal equestrian'],
        ['fa-solid fa-kiwi-bird', 'kiwi bird animal nature'],
        // Brands
        ['fa-brands fa-github', 'github git code repository'],
        ['fa-brands fa-python', 'python programming language'],
        ['fa-brands fa-js', 'javascript js programming'],
        ['fa-brands fa-react', 'react frontend framework'],
        ['fa-brands fa-vuejs', 'vue vuejs frontend framework'],
        ['fa-brands fa-angular', 'angular frontend framework'],
        ['fa-brands fa-node-js', 'node nodejs backend javascript'],
        ['fa-brands fa-docker', 'docker container devops'],
        ['fa-brands fa-aws', 'aws amazon cloud'],
        ['fa-brands fa-google', 'google search cloud'],
        ['fa-brands fa-microsoft', 'microsoft azure windows'],
        ['fa-brands fa-linux', 'linux os server opensource'],
        ['fa-brands fa-apple', 'apple mac ios'],
        ['fa-brands fa-android', 'android mobile google'],
        ['fa-brands fa-windows', 'windows microsoft os'],
        ['fa-brands fa-chrome', 'chrome browser google'],
        ['fa-brands fa-firefox-browser', 'firefox browser mozilla'],
        ['fa-brands fa-slack', 'slack communication team'],
        ['fa-brands fa-discord', 'discord chat community gaming'],
        ['fa-brands fa-telegram', 'telegram messenger chat'],
        ['fa-brands fa-whatsapp', 'whatsapp messenger chat'],
        ['fa-brands fa-youtube', 'youtube video streaming'],
        ['fa-brands fa-twitter', 'twitter social media x'],
        ['fa-brands fa-linkedin', 'linkedin professional social'],
        ['fa-brands fa-instagram', 'instagram social photo'],
        ['fa-brands fa-facebook', 'facebook social media'],
        ['fa-brands fa-tiktok', 'tiktok social video short'],
        ['fa-brands fa-wordpress', 'wordpress blog cms'],
        ['fa-brands fa-shopify', 'shopify ecommerce store'],
        ['fa-brands fa-stripe', 'stripe payment finance'],
        ['fa-brands fa-paypal', 'paypal payment finance'],
        ['fa-brands fa-bitcoin', 'bitcoin crypto blockchain'],
        ['fa-brands fa-ethereum', 'ethereum crypto blockchain'],
        ['fa-brands fa-figma', 'figma design ui ux'],
        ['fa-brands fa-sketch', 'sketch design ui'],
        ['fa-brands fa-sass', 'sass css styles'],
        ['fa-brands fa-css3-alt', 'css css3 styles web'],
        ['fa-brands fa-html5', 'html html5 web markup'],
        ['fa-brands fa-bootstrap', 'bootstrap css framework'],
        ['fa-brands fa-npm', 'npm package manager node'],
        ['fa-brands fa-git-alt', 'git version control'],
        ['fa-brands fa-stack-overflow', 'stackoverflow qa dev community'],
        ['fa-brands fa-kaggle', 'kaggle data science competition'],
        ['fa-brands fa-raspberry-pi', 'raspberry pi hardware iot'],
        ['fa-brands fa-unity', 'unity game engine 3d'],
        ['fa-brands fa-unreal-engine', 'unreal engine game 3d'],
        ['fa-brands fa-swift', 'swift apple ios programming'],
        ['fa-brands fa-java', 'java programming language'],
        ['fa-brands fa-php', 'php web backend programming'],
        ['fa-brands fa-rust', 'rust programming language systems'],
        ['fa-brands fa-golang', 'go golang programming language'],
        ['fa-brands fa-r-project', 'r statistics data science'],
    ];

    // ─── State ─────────────────────────────────────────────
    const state = {
        lang: localStorage.getItem('hub-lang') || 'en',
        theme: localStorage.getItem('hub-theme') || 'dark',
        view: localStorage.getItem('hub-view') || 'grid',
        projects: [],
        categories: [],
        catMap: {},
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
            loadAllCategories().then(() => initAdmin());
        } else {
            loadAllCategories().then(() => initPublic());
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
                label.textContent = getCatLabel(state.selectedCategory);
            }

            dropdown.classList.remove('open');
            renderProjects(filterProjects());
        });
    }

    async function loadAllCategories() {
        try {
            const res = await fetch('/api/categories');
            state.categories = await res.json();
            state.catMap = {};
            for (const c of state.categories) {
                state.catMap[c.key] = c;
            }
        } catch (err) {
            console.error('Failed to load categories:', err);
        }
    }

    function getCatLabel(key) {
        const c = state.catMap[key];
        if (!c) return key;
        return state.lang === 'ar' ? (c.label_ar || c.label_en) : c.label_en;
    }

    function getCatIcon(key) {
        const c = state.catMap[key];
        return c ? c.icon : 'fa-solid fa-shapes';
    }

    async function populateCategoryDropdown() {
        const menu = document.getElementById('categoryMenu');
        if (!menu) return;

        const isAr = state.lang === 'ar';

        try {
            const res = await fetch('/api/categories/active');
            const cats = await res.json();

            let html = `<div class="custom-dropdown__item ${state.selectedCategory === 'all' ? 'active' : ''}" data-value="all">
                <i class="fa-solid fa-border-all"></i>
                <span>${isAr ? 'جميع الفئات' : 'All Categories'}</span>
            </div>`;

            for (const cat of cats) {
                const label = isAr ? (cat.label_ar || cat.label_en) : cat.label_en;
                html += `<div class="custom-dropdown__item ${state.selectedCategory === cat.key ? 'active' : ''}" data-value="${cat.key}">
                    <i class="${cat.icon}"></i>
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
            const catLabel = getCatLabel(p.category);
            const dateStr = p.created_at ? new Date(p.created_at).toLocaleDateString(isAr ? 'ar' : 'en', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

            const fallbackIcon = p.project_icon || getCatIcon(p.category);
            const imageHtml = p.image
                ? `<img src="/static/${p.image}" alt="${name}" class="project-card__image" loading="lazy">`
                : `<div class="project-card__icon-display"><i class="${fallbackIcon}"></i></div>`;

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
        initIconPicker();
        populateCategorySuggestions();
        initCategoryManagement();
        initChangePassword();
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
            const catLabel = getCatLabel(p.category);
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

    // ─── Icon Picker ────────────────────────────────────────

    let iconPickerCallback = null;

    function initIconPicker() {
        const modal = document.getElementById('iconPickerModal');
        const closeBtn = document.getElementById('iconPickerClose');
        const searchInput = document.getElementById('iconSearchInput');
        const grid = document.getElementById('iconPickerGrid');
        if (!modal || !grid) return;

        // Render all icons initially
        renderIconGrid('');

        // Search filter
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                renderIconGrid(searchInput.value.trim().toLowerCase());
            });
        }

        // Close modal
        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

        // Click icon in grid
        grid.addEventListener('click', (e) => {
            const item = e.target.closest('.icon-picker-item');
            if (!item) return;
            const iconClass = item.dataset.icon;
            if (iconPickerCallback) iconPickerCallback(iconClass);
            closeModal(modal);
        });

        // Trigger button
        const trigger = document.getElementById('projectIconTrigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const currentIcon = document.getElementById('projectIconValue').value;
                iconPickerCallback = (iconClass) => {
                    document.getElementById('projectIconValue').value = iconClass;
                    const preview = document.getElementById('projectIconPreview');
                    preview.className = iconClass;
                    preview.nextElementSibling.textContent = iconClass.split(' ').pop().replace('fa-', '');
                };
                openIconPickerModal(currentIcon);
            });
        }
    }

    function renderIconGrid(search) {
        const grid = document.getElementById('iconPickerGrid');
        if (!grid) return;

        const filtered = search
            ? FA_ICONS.filter(([cls, tags]) => tags.includes(search) || cls.includes(search))
            : FA_ICONS;

        grid.innerHTML = filtered.map(([cls]) => {
            return `<div class="icon-picker-item" data-icon="${cls}" title="${cls}"><i class="${cls}"></i></div>`;
        }).join('');

        if (!filtered.length) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No icons found</div>';
        }
    }

    function openIconPickerModal(currentIcon) {
        const modal = document.getElementById('iconPickerModal');
        const searchInput = document.getElementById('iconSearchInput');
        if (searchInput) searchInput.value = '';
        renderIconGrid('');

        // Mark currently selected
        if (currentIcon) {
            setTimeout(() => {
                const items = modal.querySelectorAll('.icon-picker-item');
                items.forEach(item => {
                    item.classList.toggle('selected', item.dataset.icon === currentIcon);
                });
            }, 50);
        }

        openModal(modal);
        if (searchInput) setTimeout(() => searchInput.focus(), 100);
    }

    function populateCategorySuggestions() {
        const input = document.getElementById('projectCategory');
        const dropdown = document.getElementById('categoryDropdown');
        if (!input || !dropdown) return;

        function renderDropdown(filter) {
            const isAr = state.lang === 'ar';
            const q = (filter || '').toLowerCase();
            const filtered = q
                ? state.categories.filter(c => c.key.includes(q) || c.label_en.toLowerCase().includes(q) || c.label_ar.includes(q))
                : state.categories;

            if (!filtered.length) {
                dropdown.innerHTML = '';
                dropdown.classList.remove('active');
                return;
            }

            dropdown.innerHTML = filtered.map(c => {
                const label = isAr ? (c.label_ar || c.label_en) : c.label_en;
                return `<div class="category-dropdown__item" data-value="${c.key}" data-icon="${c.icon}">
                    <i class="${c.icon}"></i>
                    ${label}
                    <span>${c.key}</span>
                </div>`;
            }).join('');
            dropdown.classList.add('active');
        }

        function autoSetIcon(catKey) {
            const cat = state.catMap[catKey];
            if (!cat) return;
            const iconInput = document.getElementById('projectIconValue');
            const preview = document.getElementById('projectIconPreview');
            if (iconInput && !iconInput.value) {
                iconInput.value = cat.icon;
                if (preview) {
                    preview.className = cat.icon;
                    preview.nextElementSibling.textContent = cat.icon.split(' ').pop().replace('fa-', '');
                }
            }
        }

        input.addEventListener('focus', () => renderDropdown(input.value));
        input.addEventListener('input', () => renderDropdown(input.value));

        dropdown.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const item = e.target.closest('.category-dropdown__item');
            if (item) {
                input.value = item.dataset.value;
                dropdown.classList.remove('active');
                autoSetIcon(item.dataset.value);
            }
        });

        input.addEventListener('blur', () => {
            setTimeout(() => dropdown.classList.remove('active'), 150);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') dropdown.classList.remove('active');
        });
    }

    // ─── Category Management ────────────────────────────────

    function initCategoryManagement() {
        const toggleBtn = document.getElementById('manageCategoriesBtn');
        const section = document.getElementById('categoriesSection');
        const addBtn = document.getElementById('addCategoryBtn');
        const addForm = document.getElementById('addCategoryForm');
        const cancelBtn = document.getElementById('cancelCategoryBtn');
        const saveBtn = document.getElementById('saveCategoryBtn');
        const grid = document.getElementById('categoriesGrid');

        if (!toggleBtn || !section) return;

        // Toggle section
        toggleBtn.addEventListener('click', () => {
            const visible = section.style.display !== 'none';
            section.style.display = visible ? 'none' : 'block';
            if (!visible) renderCategoriesGrid();
        });

        // Show/hide add form
        if (addBtn) addBtn.addEventListener('click', () => {
            addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
            if (addForm.style.display === 'block') {
                document.getElementById('newCatKey').value = '';
                document.getElementById('newCatLabelEn').value = '';
                document.getElementById('newCatLabelAr').value = '';
                document.getElementById('newCatIconValue').value = 'fa-solid fa-shapes';
                document.getElementById('newCatIconPreview').className = 'fa-solid fa-shapes';
            }
        });

        if (cancelBtn) cancelBtn.addEventListener('click', () => {
            addForm.style.display = 'none';
        });

        // Icon picker for new category
        const iconTrigger = document.getElementById('newCatIconTrigger');
        if (iconTrigger) {
            iconTrigger.addEventListener('click', () => {
                const currentIcon = document.getElementById('newCatIconValue').value;
                iconPickerCallback = (iconClass) => {
                    document.getElementById('newCatIconValue').value = iconClass;
                    document.getElementById('newCatIconPreview').className = iconClass;
                };
                openIconPickerModal(currentIcon);
            });
        }

        // Save new category
        if (saveBtn) saveBtn.addEventListener('click', async () => {
            const key = document.getElementById('newCatKey').value.trim().toLowerCase().replace(/\s+/g, '');
            const labelEn = document.getElementById('newCatLabelEn').value.trim();
            const labelAr = document.getElementById('newCatLabelAr').value.trim();
            const icon = document.getElementById('newCatIconValue').value;

            if (!key || !labelEn) {
                alert(state.lang === 'ar' ? 'المفتاح والاسم بالإنجليزية مطلوبان' : 'Key and English label are required');
                return;
            }

            try {
                const res = await fetch('/api/admin/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key, label_en: labelEn, label_ar: labelAr || labelEn, icon })
                });
                const data = await res.json();
                if (!res.ok) {
                    alert(data.error || 'Error creating category');
                    return;
                }
                addForm.style.display = 'none';
                await loadAllCategories();
                renderCategoriesGrid();
            } catch (err) {
                alert('Failed to create category');
            }
        });

        // Delete category (delegated)
        if (grid) grid.addEventListener('click', async (e) => {
            const delBtn = e.target.closest('.admin-cat-chip__delete');
            if (!delBtn) return;
            const key = delBtn.dataset.key;
            const confirmMsg = state.lang === 'ar' ? `حذف الفئة "${key}"؟` : `Delete category "${key}"?`;
            if (!confirm(confirmMsg)) return;

            try {
                await fetch(`/api/admin/categories/${key}`, { method: 'DELETE' });
                await loadAllCategories();
                renderCategoriesGrid();
            } catch (err) {
                alert('Failed to delete category');
            }
        });
    }

    function renderCategoriesGrid() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;

        const isAr = state.lang === 'ar';

        grid.innerHTML = state.categories.map(c => {
            const label = isAr ? (c.label_ar || c.label_en) : c.label_en;
            return `<div class="admin-cat-chip">
                <i class="${c.icon} cat-icon"></i>
                <div class="admin-cat-chip__info">
                    <div class="admin-cat-chip__label">${label}</div>
                    <div class="admin-cat-chip__key">${c.key}</div>
                </div>
                <button class="admin-cat-chip__delete" data-key="${c.key}" title="Delete">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>`;
        }).join('');

        if (!state.categories.length) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:var(--text-muted);">No categories defined</div>';
        }
    }

    // ─── Change Password ────────────────────────────────────

    function initChangePassword() {
        const settingsBtn = document.getElementById('adminSettingsBtn');
        const modal = document.getElementById('changePasswordModal');
        const closeBtn = document.getElementById('changePasswordClose');
        const cancelBtn = document.getElementById('changePasswordCancel');
        const saveBtn = document.getElementById('changePasswordSave');
        const errorEl = document.getElementById('changePasswordError');
        const successEl = document.getElementById('changePasswordSuccess');

        if (!settingsBtn || !modal) return;

        function resetForm() {
            document.getElementById('currentPasswordInput').value = '';
            document.getElementById('newPasswordInput').value = '';
            document.getElementById('confirmPasswordInput').value = '';
            errorEl.style.display = 'none';
            successEl.style.display = 'none';
        }

        settingsBtn.addEventListener('click', () => {
            resetForm();
            openModal(modal);
        });

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        if (cancelBtn) cancelBtn.addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

        if (saveBtn) saveBtn.addEventListener('click', async () => {
            const current = document.getElementById('currentPasswordInput').value;
            const newPw = document.getElementById('newPasswordInput').value;
            const confirm = document.getElementById('confirmPasswordInput').value;
            const isAr = state.lang === 'ar';

            errorEl.style.display = 'none';
            successEl.style.display = 'none';

            if (!current || !newPw) {
                errorEl.textContent = isAr ? 'جميع الحقول مطلوبة' : 'All fields are required';
                errorEl.style.display = 'block';
                return;
            }

            if (newPw !== confirm) {
                errorEl.textContent = isAr ? 'كلمات المرور غير متطابقة' : 'Passwords do not match';
                errorEl.style.display = 'block';
                return;
            }

            if (newPw.length < 4) {
                errorEl.textContent = isAr ? 'كلمة المرور يجب أن تكون 4 أحرف على الأقل' : 'Password must be at least 4 characters';
                errorEl.style.display = 'block';
                return;
            }

            try {
                const res = await fetch('/api/admin/change-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ current_password: current, new_password: newPw })
                });
                const data = await res.json();
                if (!res.ok) {
                    errorEl.textContent = data.error || 'Error';
                    errorEl.style.display = 'block';
                } else {
                    successEl.style.display = 'block';
                    setTimeout(() => closeModal(modal), 1500);
                }
            } catch (err) {
                errorEl.textContent = 'Network error';
                errorEl.style.display = 'block';
            }
        });
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

                // Show loading overlay
                const submitBtn = document.getElementById('projectFormSubmit');
                const originalBtnText = submitBtn ? submitBtn.textContent : '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + (state.lang === 'ar' ? 'جاري الرفع...' : 'Uploading...');
                }

                let loadingOverlay = modal.querySelector('.upload-loading-overlay');
                if (!loadingOverlay) {
                    loadingOverlay = document.createElement('div');
                    loadingOverlay.className = 'upload-loading-overlay';
                    loadingOverlay.innerHTML = `
                        <div class="upload-loading-content">
                            <div class="upload-spinner"></div>
                            <p>${state.lang === 'ar' ? 'جاري رفع المشروع...' : 'Uploading project...'}</p>
                            <span>${state.lang === 'ar' ? 'قد يستغرق بعض الوقت بسبب حجم الصورة' : 'This may take a moment due to image size'}</span>
                        </div>`;
                    modal.querySelector('.modal').appendChild(loadingOverlay);
                }
                loadingOverlay.classList.add('active');

                const formData = new FormData();

                formData.append('name_en', document.getElementById('nameEn').value);
                formData.append('name_ar', document.getElementById('nameAr').value);
                formData.append('description_en', document.getElementById('descEn').value);
                formData.append('description_ar', document.getElementById('descAr').value);
                formData.append('url', document.getElementById('projectUrl').value);
                formData.append('github_url', document.getElementById('projectGithubUrl').value);
                formData.append('category', document.getElementById('projectCategory').value);
                formData.append('project_icon', document.getElementById('projectIconValue').value);
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
                    loadingOverlay.classList.remove('active');
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }

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
                    loadingOverlay.classList.remove('active');
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
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

        // Reset icon picker
        document.getElementById('projectIconValue').value = '';
        const iconPreview = document.getElementById('projectIconPreview');
        if (iconPreview) {
            iconPreview.className = 'fa-solid fa-icons';
            iconPreview.nextElementSibling.textContent = state.lang === 'ar' ? 'اختر أيقونة' : 'Choose Icon';
        }

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

            // Pre-fill icon picker
            const iconVal = project.project_icon || '';
            document.getElementById('projectIconValue').value = iconVal;
            const preview = document.getElementById('projectIconPreview');
            if (iconVal) {
                preview.className = iconVal;
                preview.nextElementSibling.textContent = iconVal.split(' ').pop().replace('fa-', '');
            } else {
                preview.className = 'fa-solid fa-icons';
                preview.nextElementSibling.textContent = state.lang === 'ar' ? 'اختر أيقونة' : 'Choose Icon';
            }
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
