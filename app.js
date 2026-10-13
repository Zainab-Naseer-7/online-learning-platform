/**
 * LEARNOVA — SMART LEARNING PLATFORM
 * Core Single-Page Application (SPA) Engine & Controller
 */

(function () {
  'use strict';

  // --- Global Application Controller ---
  const LearnovaApp = {
    // Application State
    state: {
      currentView: 'landing',
      courses: [],
      categories: [],
      user: {
        id: 'u1',
        name: 'Alex Mercer',
        email: 'alex.mercer@techcorp.io',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      },
      enrolled: {}, // { courseId: { completedLessons: [], progress: 0, quizPassed: false, notes: '' } }
      wishlist: ['c3'],
      activeCourseId: 'c1',
      activeLessonId: 'c1-l1',
      activeModuleIndex: 0,
      activeLessonIndex: 0,
      quizState: {
        questions: [],
        currentIndex: 0,
        selectedAnswers: {},
        score: 0,
        timeLeft: 600,
        timerInterval: null
      },
      conversations: [],
      activeChatId: 'conv-1',
      adminUsers: [],
      notifications: [],
      theme: 'dark'
    },

    // Initialization Entry Point
    init() {
      this.loadSavedState();
      this.setupDOM();
      this.bindEvents();
      this.renderAll();
      this.setupScrollHeader();
      console.log('Learnova LMS Engine Initialized successfully.');
    },

    // Load state from localStorage or seed from data.js
    loadSavedState() {
      // Theme
      const savedTheme = localStorage.getItem('learnova_theme') || 'dark';
      this.state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.updateThemeIcons(savedTheme);

      // Courses (seed + custom created courses)
      const storedCustomCourses = localStorage.getItem('learnova_custom_courses');
      const customCourses = storedCustomCourses ? JSON.parse(storedCustomCourses) : [];
      this.state.courses = [...LEARNOVA_DATA.courses, ...customCourses];
      this.state.categories = LEARNOVA_DATA.categories;

      // User session
      const storedUser = localStorage.getItem('learnova_user');
      if (storedUser) {
        this.state.user = JSON.parse(storedUser);
      }

      // Enrolled Courses & Progress
      const storedEnrolled = localStorage.getItem('learnova_enrolled');
      if (storedEnrolled) {
        this.state.enrolled = JSON.parse(storedEnrolled);
      } else {
        // Default initial enrollments
        this.state.enrolled = {
          'c1': {
            completedLessons: ['c1-l1', 'c1-l2'],
            progress: 25,
            quizPassed: true,
            notes: 'High performance Redis cache invalidation uses pub/sub channels. React 19 memoization.'
          },
          'c2': {
            completedLessons: ['c2-l1'],
            progress: 15,
            quizPassed: false,
            notes: 'LoRA uses low-rank decomposition matrices W = A * B.'
          }
        };
        this.saveEnrolled();
      }

      // Wishlist
      const storedWishlist = localStorage.getItem('learnova_wishlist');
      if (storedWishlist) {
        this.state.wishlist = JSON.parse(storedWishlist);
      }

      // Notifications
      const storedNotifs = localStorage.getItem('learnova_notifications');
      this.state.notifications = storedNotifs ? JSON.parse(storedNotifs) : LEARNOVA_DATA.initialNotifications;

      // Messaging
      this.state.conversations = LEARNOVA_DATA.initialConversations;
      this.state.adminUsers = LEARNOVA_DATA.initialAdminUsers;
    },

    saveEnrolled() {
      localStorage.setItem('learnova_enrolled', JSON.stringify(this.state.enrolled));
      this.updateWishlistAndEnrolledBadges();
    },

    saveWishlist() {
      localStorage.setItem('learnova_wishlist', JSON.stringify(this.state.wishlist));
      this.updateWishlistAndEnrolledBadges();
    },

    saveNotifications() {
      localStorage.setItem('learnova_notifications', JSON.stringify(this.state.notifications));
      this.renderNotificationCenter();
    },

    // DOM References Cache
    setupDOM() {
      this.dom = {
        header: document.getElementById('site-header'),
        appRoot: document.getElementById('app-root'),
        navLinks: document.querySelectorAll('.nav-link'),
        roleSwitcher: document.getElementById('role-switcher-select'),
        categoriesContainer: document.getElementById('categories-container'),
        coursesGrid: document.getElementById('courses-grid-container'),
        categoryFilterPills: document.getElementById('category-filter-pills'),
        marketplaceSearch: document.getElementById('marketplace-search-input'),
        searchClearBtn: document.getElementById('marketplace-search-clear'),
        difficultyFilter: document.getElementById('difficulty-filter'),
        priceFilter: document.getElementById('price-filter'),
        sortFilter: document.getElementById('sort-filter'),
        themeToggleBtn: document.getElementById('theme-toggle-btn'),
        themeIconSun: document.getElementById('theme-icon-sun'),
        themeIconMoon: document.getElementById('theme-icon-moon'),
        notifBellBtn: document.getElementById('notif-bell-btn'),
        notifDropdown: document.getElementById('notification-dropdown'),
        notifCount: document.getElementById('notif-unread-count'),
        notifItems: document.getElementById('notification-list-items'),
        wishlistBtn: document.getElementById('nav-wishlist-btn'),
        wishlistCount: document.getElementById('nav-wishlist-count'),
        authModal: document.getElementById('auth-modal'),
        authModalClose: document.getElementById('auth-modal-close'),
        navLoginBtn: document.getElementById('nav-login-btn'),
        authButtonsContainer: document.getElementById('auth-buttons-container'),
        searchModal: document.getElementById('search-modal'),
        searchModalClose: document.getElementById('search-modal-close'),
        searchModalTrigger: document.getElementById('search-modal-trigger'),
        commandInput: document.getElementById('command-palette-input'),
        commandResults: document.getElementById('command-search-results'),
        createCourseModal: document.getElementById('create-course-modal'),
        createCourseClose: document.getElementById('create-course-modal-close'),
        createCourseForm: document.getElementById('create-course-form'),
        openCreateCourseBtn: document.getElementById('open-create-course-modal-btn'),
        mobileHamburgerBtn: document.getElementById('mobile-hamburger-btn'),
        mobileDrawer: document.getElementById('mobile-drawer'),
        closeDrawerBtn: document.getElementById('close-drawer-btn'),
        toastContainer: document.getElementById('toast-container')
      };
    },

    // Global Event Binding
    bindEvents() {
      const self = this;

      // Navigation Link Clicks
      document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-view]');
        if (link) {
          e.preventDefault();
          const targetView = link.getAttribute('data-view');
          self.switchView(targetView);
          if (self.dom.mobileDrawer) self.dom.mobileDrawer.classList.remove('open');
        }
      });

      // Role Portal Switcher
      if (this.dom.roleSwitcher) {
        this.dom.roleSwitcher.addEventListener('change', (e) => {
          const role = e.target.value;
          if (role === 'student') self.switchView('student-dashboard');
          else if (role === 'instructor') self.switchView('instructor-dashboard');
          else if (role === 'admin') self.switchView('admin-dashboard');
        });
      }

      // Theme Toggle
      if (this.dom.themeToggleBtn) {
        this.dom.themeToggleBtn.addEventListener('click', () => self.toggleTheme());
      }

      // Notifications Dropdown Toggle
      if (this.dom.notifBellBtn) {
        this.dom.notifBellBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          self.dom.notifDropdown.classList.toggle('active');
        });
      }

      document.addEventListener('click', (e) => {
        if (self.dom.notifDropdown && !self.dom.notifDropdown.contains(e.target) && e.target !== self.dom.notifBellBtn) {
          self.dom.notifDropdown.classList.remove('active');
        }
      });

      const markAllReadBtn = document.getElementById('mark-all-read-btn');
      if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
          self.state.notifications.forEach(n => n.read = true);
          self.saveNotifications();
          self.showToast('All notifications marked as read', 'info');
        });
      }

      // Wishlist Button Nav Click
      if (this.dom.wishlistBtn) {
        this.dom.wishlistBtn.addEventListener('click', () => {
          self.switchView('student-dashboard');
          self.switchStudentSubTab('wishlist');
        });
      }

      // Search Modal / Command Palette
      if (this.dom.searchModalTrigger) {
        this.dom.searchModalTrigger.addEventListener('click', () => self.openSearchModal());
      }
      if (this.dom.searchModalClose) {
        this.dom.searchModalClose.addEventListener('click', () => self.closeSearchModal());
      }
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          self.openSearchModal();
        }
        if (e.key === 'Escape') {
          self.closeAllModals();
        }
      });

      if (this.dom.commandInput) {
        this.dom.commandInput.addEventListener('input', (e) => self.handleCommandSearch(e.target.value));
      }

      // Marketplace Live Search & Filters
      if (this.dom.marketplaceSearch) {
        this.dom.marketplaceSearch.addEventListener('input', (e) => {
          const val = e.target.value.trim();
          self.dom.searchClearBtn.style.display = val ? 'block' : 'none';
          self.filterAndRenderCourses();
        });
      }

      if (this.dom.searchClearBtn) {
        this.dom.searchClearBtn.addEventListener('click', () => {
          self.dom.marketplaceSearch.value = '';
          self.dom.searchClearBtn.style.display = 'none';
          self.filterAndRenderCourses();
        });
      }

      if (this.dom.categoryFilterPills) {
        this.dom.categoryFilterPills.addEventListener('click', (e) => {
          const pill = e.target.closest('.filter-pill');
          if (pill) {
            self.dom.categoryFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            self.filterAndRenderCourses();
          }
        });
      }

      if (this.dom.difficultyFilter) {
        this.dom.difficultyFilter.addEventListener('change', () => self.filterAndRenderCourses());
      }
      if (this.dom.priceFilter) {
        this.dom.priceFilter.addEventListener('change', () => self.filterAndRenderCourses());
      }
      if (this.dom.sortFilter) {
        this.dom.sortFilter.addEventListener('change', () => self.filterAndRenderCourses());
      }

      // Auth Modal Handlers
      if (this.dom.navLoginBtn) {
        this.dom.navLoginBtn.addEventListener('click', () => self.openAuthModal('login'));
      }
      if (this.dom.authModalClose) {
        this.dom.authModalClose.addEventListener('click', () => self.closeAuthModal());
      }

      const authTabLogin = document.getElementById('auth-tab-login');
      const authTabRegister = document.getElementById('auth-tab-register');
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');

      if (authTabLogin && authTabRegister) {
        authTabLogin.addEventListener('click', () => {
          authTabLogin.classList.add('active');
          authTabRegister.classList.remove('active');
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
        });
        authTabRegister.addEventListener('click', () => {
          authTabRegister.classList.add('active');
          authTabLogin.classList.remove('active');
          loginForm.style.display = 'none';
          registerForm.style.display = 'block';
        });
      }

      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          self.handleAuthSuccess({ name: 'Alex Mercer', email, role: 'student' });
        });
      }

      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('reg-name').value;
          const email = document.getElementById('reg-email').value;
          const role = document.getElementById('reg-role').value;
          self.handleAuthSuccess({ name, email, role });
        });
      }

      // Mobile Hamburger & Drawer
      if (this.dom.mobileHamburgerBtn) {
        this.dom.mobileHamburgerBtn.addEventListener('click', () => {
          self.dom.mobileDrawer.classList.toggle('open');
        });
      }
      if (this.dom.closeDrawerBtn) {
        this.dom.closeDrawerBtn.addEventListener('click', () => {
          self.dom.mobileDrawer.classList.remove('open');
        });
      }

      const mobileAuthBtn = document.getElementById('mobile-auth-btn');
      if (mobileAuthBtn) {
        mobileAuthBtn.addEventListener('click', () => {
          self.dom.mobileDrawer.classList.remove('open');
          self.openAuthModal('login');
        });
      }

      // Hero Buttons
      const heroQuickStart = document.getElementById('hero-quick-start-btn');
      if (heroQuickStart) {
        heroQuickStart.addEventListener('click', () => self.openCourseDetail('c1'));
      }
      const heroPreviewPlay = document.getElementById('hero-preview-play-btn');
      if (heroPreviewPlay) {
        heroPreviewPlay.addEventListener('click', () => self.openClassroom('c1'));
      }

      // Course Details Back Button
      const detailBack = document.getElementById('detail-back-to-courses');
      if (detailBack) {
        detailBack.addEventListener('click', () => self.switchView('landing'));
      }

      // Classroom Controls & Tabs
      const classroomBack = document.getElementById('classroom-back-btn');
      if (classroomBack) {
        classroomBack.addEventListener('click', () => self.switchView('student-dashboard'));
      }

      const lessonMarkCompleteBtn = document.getElementById('lesson-mark-complete-btn');
      if (lessonMarkCompleteBtn) {
        lessonMarkCompleteBtn.addEventListener('click', () => self.markCurrentLessonComplete());
      }

      const lessonNextBtn = document.getElementById('lesson-next-btn');
      if (lessonNextBtn) {
        lessonNextBtn.addEventListener('click', () => self.navigateLesson(1));
      }

      const lessonPrevBtn = document.getElementById('lesson-prev-btn');
      if (lessonPrevBtn) {
        lessonPrevBtn.addEventListener('click', () => self.navigateLesson(-1));
      }

      const classroomTakeQuizBtn = document.getElementById('classroom-take-quiz-btn');
      if (classroomTakeQuizBtn) {
        classroomTakeQuizBtn.addEventListener('click', () => self.openQuiz(self.state.activeCourseId));
      }

      const classroomViewCertBtn = document.getElementById('classroom-view-cert-btn');
      if (classroomViewCertBtn) {
        classroomViewCertBtn.addEventListener('click', () => self.openCertificate(self.state.activeCourseId));
      }

      // Classroom Tabs
      document.querySelectorAll('.classroom-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tab = e.target.getAttribute('data-tab');
          if (!tab) return;
          document.querySelectorAll('.classroom-tab-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');

          document.getElementById('tab-content-notes').style.display = tab === 'notes' ? 'block' : 'none';
          document.getElementById('tab-content-resources').style.display = tab === 'resources' ? 'block' : 'none';
          document.getElementById('tab-content-discussion').style.display = tab === 'discussion' ? 'block' : 'none';
        });
      });

      // Notes Auto-Save
      const notesTextarea = document.getElementById('lesson-notes-textarea');
      if (notesTextarea) {
        notesTextarea.addEventListener('input', (e) => {
          const text = e.target.value;
          if (!self.state.enrolled[self.state.activeCourseId]) {
            self.state.enrolled[self.state.activeCourseId] = { completedLessons: [], progress: 0, notes: '' };
          }
          self.state.enrolled[self.state.activeCourseId].notes = text;
          self.saveEnrolled();
          const status = document.getElementById('notes-save-status');
          if (status) status.textContent = 'Saved just now';
        });
      }

      const clearNotesBtn = document.getElementById('clear-notes-btn');
      if (clearNotesBtn) {
        clearNotesBtn.addEventListener('click', () => {
          if (notesTextarea) notesTextarea.value = '';
          if (self.state.enrolled[self.state.activeCourseId]) {
            self.state.enrolled[self.state.activeCourseId].notes = '';
            self.saveEnrolled();
          }
          self.showToast('Notes cleared', 'info');
        });
      }

      // Discussion Post
      const discussionPostBtn = document.getElementById('discussion-post-btn');
      const discussionInput = document.getElementById('discussion-input');
      if (discussionPostBtn && discussionInput) {
        discussionPostBtn.addEventListener('click', () => {
          const text = discussionInput.value.trim();
          if (!text) return;
          self.addDiscussionMessage(text);
          discussionInput.value = '';
        });
      }

      // Quiz Buttons
      const quizSubmitBtn = document.getElementById('quiz-submit-btn');
      if (quizSubmitBtn) {
        quizSubmitBtn.addEventListener('click', () => self.submitQuizAnswer());
      }
      const quizPrevBtn = document.getElementById('quiz-prev-btn');
      if (quizPrevBtn) {
        quizPrevBtn.addEventListener('click', () => self.navigateQuizQuestion(-1));
      }
      const quizRetryBtn = document.getElementById('quiz-retry-btn');
      if (quizRetryBtn) {
        quizRetryBtn.addEventListener('click', () => self.resetQuiz());
      }
      const quizClaimCertBtn = document.getElementById('quiz-claim-cert-btn');
      if (quizClaimCertBtn) {
        quizClaimCertBtn.addEventListener('click', () => self.openCertificate(self.state.activeCourseId));
      }

      // Certificate Buttons
      const certBackBtn = document.getElementById('cert-back-btn');
      if (certBackBtn) {
        certBackBtn.addEventListener('click', () => self.switchView('student-dashboard'));
      }
      const certPrintBtn = document.getElementById('cert-print-btn');
      if (certPrintBtn) {
        certPrintBtn.addEventListener('click', () => window.print());
      }
      const certShareBtn = document.getElementById('cert-share-btn');
      if (certShareBtn) {
        certShareBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(`https://learnova.io/verify/${document.getElementById('cert-rendered-id').textContent}`);
          self.showToast('Verification link copied to clipboard!', 'success');
        });
      }

      // Student Dashboard Sidebar Tabs
      document.querySelectorAll('.dashboard-sidebar .dashboard-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
          const sub = e.target.getAttribute('data-sub');
          self.switchStudentSubTab(sub);
        });
      });

      // Instructor Create Course Form
      if (this.dom.openCreateCourseBtn) {
        this.dom.openCreateCourseBtn.addEventListener('click', () => {
          self.dom.createCourseModal.classList.add('active');
        });
      }
      if (this.dom.createCourseClose) {
        this.dom.createCourseClose.addEventListener('click', () => {
          self.dom.createCourseModal.classList.remove('active');
        });
      }
      if (this.dom.createCourseForm) {
        this.dom.createCourseForm.addEventListener('submit', (e) => {
          e.preventDefault();
          self.handleCreateCourse();
        });
      }

      // Chat Input
      const chatSendBtn = document.getElementById('chat-send-btn');
      const chatInputField = document.getElementById('chat-input-field');
      if (chatSendBtn && chatInputField) {
        chatSendBtn.addEventListener('click', () => self.handleSendChatMessage());
        chatInputField.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') self.handleSendChatMessage();
        });
      }
    },

    // Sticky Header Scroll Effect
    setupScrollHeader() {
      const header = this.dom.header;
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    },

    // SPA View Router
    switchView(viewName) {
      if (viewName === 'courses') {
        viewName = 'landing';
        setTimeout(() => {
          const cat = document.getElementById('courses-catalog');
          if (cat) cat.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else if (viewName === 'categories') {
        viewName = 'landing';
        setTimeout(() => {
          const sec = document.getElementById('categories-section');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }

      document.querySelectorAll('.spa-view').forEach(view => {
        view.style.display = 'none';
        view.classList.remove('active');
      });

      const targetSection = document.getElementById(`view-${viewName}`);
      if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      this.state.currentView = viewName;

      // Update Nav Link Active States
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-view') === viewName) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Update role switcher reflectively
      if (this.dom.roleSwitcher) {
        if (viewName === 'student-dashboard') this.dom.roleSwitcher.value = 'student';
        else if (viewName === 'instructor-dashboard') this.dom.roleSwitcher.value = 'instructor';
        else if (viewName === 'admin-dashboard') this.dom.roleSwitcher.value = 'admin';
      }

      // Re-render sub components if needed
      if (viewName === 'student-dashboard') {
        this.renderStudentDashboard();
      } else if (viewName === 'instructor-dashboard') {
        this.renderInstructorDashboard();
      } else if (viewName === 'admin-dashboard') {
        this.renderAdminDashboard();
      } else if (viewName === 'messages') {
        this.renderMessagingUI();
      }
    },

    // Master Render Method
    renderAll() {
      this.renderCategories();
      this.filterAndRenderCourses();
      this.renderTestimonials();
      this.renderFAQs();
      this.renderNotificationCenter();
      this.updateWishlistAndEnrolledBadges();
      this.updateUserAuthUI();
    },

    // Render 10 Category Cards
    renderCategories() {
      const container = this.dom.categoriesContainer;
      if (!container) return;

      container.innerHTML = this.state.categories.map(cat => `
        <div class="category-card" onclick="LearnovaApp.filterByCategory('${cat.id}')">
          <div class="category-icon-box" style="background:${cat.gradient};">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${this.getCategorySVGPath(cat.icon)}
            </svg>
          </div>
          <div>
            <div class="category-name">${cat.name}</div>
            <div class="category-count">${cat.count} Masterclasses</div>
          </div>
        </div>
      `).join('');
    },

    getCategorySVGPath(icon) {
      switch (icon) {
        case 'code': return '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>';
        case 'cpu': return '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>';
        case 'bar-chart': return '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>';
        case 'layout': return '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>';
        case 'shield': return '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>';
        case 'smartphone': return '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>';
        case 'cloud': return '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>';
        case 'trending-up': return '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>';
        case 'briefcase': return '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>';
        default: return '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
      }
    },

    filterByCategory(catId) {
      if (this.dom.categoryFilterPills) {
        this.dom.categoryFilterPills.querySelectorAll('.filter-pill').forEach(pill => {
          if (pill.getAttribute('data-category') === catId) pill.classList.add('active');
          else pill.classList.remove('active');
        });
      }
      this.filterAndRenderCourses();
      const catEl = document.getElementById('courses-catalog');
      if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
    },

    // Marketplace Search & Filter Engine
    filterAndRenderCourses() {
      const container = this.dom.coursesGrid;
      if (!container) return;

      const query = (this.dom.marketplaceSearch ? this.dom.marketplaceSearch.value : '').toLowerCase().trim();
      const activePill = document.querySelector('.filter-pill.active');
      const selectedCategory = activePill ? activePill.getAttribute('data-category') : 'all';
      const difficulty = this.dom.difficultyFilter ? this.dom.difficultyFilter.value : 'all';
      const priceRange = this.dom.priceFilter ? this.dom.priceFilter.value : 'all';
      const sortBy = this.dom.sortFilter ? this.dom.sortFilter.value : 'popular';

      let filtered = this.state.courses.filter(course => {
        // Query search
        if (query) {
          const matchTitle = course.title.toLowerCase().includes(query);
          const matchDesc = course.description.toLowerCase().includes(query);
          const matchCat = course.categoryName.toLowerCase().includes(query);
          const matchInst = course.instructor.name.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc && !matchCat && !matchInst) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;

        // Difficulty filter
        if (difficulty !== 'all' && course.difficulty !== difficulty) return false;

        // Price filter
        if (priceRange === 'under-80' && course.price >= 80) return false;
        if (priceRange === '80-100' && (course.price < 80 || course.price > 100)) return false;

        return true;
      });

      // Sorting
      filtered.sort((a, b) => {
        if (sortBy === 'popular') return b.studentsCount - a.studentsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px;">
            <div style="width:60px; height:60px; border-radius:50%; background:var(--bg-surface-elevated); margin:0 auto 16px; display:flex; align-items:center; justify-content:center; color:var(--text-muted);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            <h3>No matching masterclasses found</h3>
            <p style="color:var(--text-secondary); margin-top:6px;">Try adjusting your keywords or clearing selected filters.</p>
            <button class="btn btn-secondary btn-sm" style="margin-top:16px;" onclick="LearnovaApp.resetMarketplaceFilters()">Reset Filters</button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(course => this.renderCourseCardHTML(course)).join('');
    },

    resetMarketplaceFilters() {
      if (this.dom.marketplaceSearch) this.dom.marketplaceSearch.value = '';
      if (this.dom.searchClearBtn) this.dom.searchClearBtn.style.display = 'none';
      if (this.dom.difficultyFilter) this.dom.difficultyFilter.value = 'all';
      if (this.dom.priceFilter) this.dom.priceFilter.value = 'all';
      if (this.dom.categoryFilterPills) {
        this.dom.categoryFilterPills.querySelectorAll('.filter-pill').forEach((p, idx) => {
          if (idx === 0) p.classList.add('active');
          else p.classList.remove('active');
        });
      }
      this.filterAndRenderCourses();
    },

    // HTML Generator for Course Card
    renderCourseCardHTML(course) {
      const isWishlisted = this.state.wishlist.includes(course.id);
      const isEnrolled = !!this.state.enrolled[course.id];
      const userProgress = isEnrolled ? this.state.enrolled[course.id].progress : 0;

      return `
        <div class="course-card" data-course-id="${course.id}">
          <div class="course-thumb-box" onclick="LearnovaApp.openCourseDetail('${course.id}')" style="cursor:pointer;">
            <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
            <div class="course-badge-top">
              <span class="badge badge-primary">${course.difficulty}</span>
            </div>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); LearnovaApp.toggleWishlist('${course.id}')" title="Save to Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <div class="course-card-content">
            <div class="course-meta-top">
              <span style="font-weight:600; color:var(--primary);">${course.categoryName}</span>
              <span>${course.duration}</span>
            </div>

            <h4 class="course-card-title" onclick="LearnovaApp.openCourseDetail('${course.id}')" style="cursor:pointer;" title="${course.title}">
              ${course.title}
            </h4>

            <p class="course-card-desc">${course.description}</p>

            <div class="course-instructor-row">
              <img src="${course.instructor.avatar}" class="course-instructor-avatar" alt="${course.instructor.name}">
              <span class="course-instructor-name">${course.instructor.name}</span>
            </div>

            <div class="course-rating-row">
              <span class="star-icon">★</span>
              <span class="rating-value">${course.rating}</span>
              <span class="rating-count">(${course.reviewCount.toLocaleString()} reviews)</span>
              <span style="margin-left:auto; color:var(--text-muted); font-size:0.8rem;">${course.studentsCount.toLocaleString()} learners</span>
            </div>

            ${isEnrolled ? `
              <div style="margin-top:8px;">
                <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom:4px;">
                  <span>Your Progress</span>
                  <span style="color:var(--primary);">${userProgress}%</span>
                </div>
                <div style="width:100%; height:6px; background:var(--bg-surface-elevated); border-radius:3px; overflow:hidden;">
                  <div style="width:${userProgress}%; height:100%; background:var(--gradient-primary);"></div>
                </div>
              </div>
            ` : ''}

            <div class="course-footer-row">
              <div class="course-price-group">
                <span class="current-price">$${course.price}</span>
                <span class="original-price">$${course.originalPrice}</span>
              </div>
              <div>
                ${isEnrolled ? `
                  <button class="btn btn-primary btn-sm" onclick="LearnovaApp.openClassroom('${course.id}')">Continue</button>
                ` : `
                  <button class="btn btn-secondary btn-sm" onclick="LearnovaApp.openCourseDetail('${course.id}')">View Details</button>
                `}
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // Course Details View Renderer
    openCourseDetail(courseId) {
      const course = this.state.courses.find(c => c.id === courseId);
      if (!course) return;

      this.state.activeCourseId = courseId;
      const isEnrolled = !!this.state.enrolled[courseId];
      const isWishlisted = this.state.wishlist.includes(courseId);

      const contentArea = document.getElementById('course-detail-content-area');
      if (!contentArea) return;

      contentArea.innerHTML = `
        <!-- Main Column -->
        <div class="course-detail-main">
          <div>
            <div style="display:flex; gap:10px; margin-bottom:12px;">
              <span class="badge badge-primary">${course.categoryName}</span>
              <span class="badge badge-violet">${course.difficulty}</span>
              <span class="badge badge-success">Verified Certificate Included</span>
            </div>
            <h1 style="margin-bottom:16px;">${course.title}</h1>
            <p style="font-size:1.15rem; line-height:1.7; margin-bottom:24px;">${course.description}</p>
            
            <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; font-size:0.95rem;">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="${course.instructor.avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;">
                <span>Instructed by <strong>${course.instructor.name}</strong></span>
              </div>
              <div>★ <strong>${course.rating}</strong> (${course.reviewCount} ratings)</div>
              <div>👥 <strong>${course.studentsCount.toLocaleString()}</strong> enrolled</div>
              <div>⏱️ <strong>${course.duration}</strong> on-demand</div>
            </div>
          </div>

          <!-- What you will learn -->
          <div class="card" style="padding:32px;">
            <h3 style="margin-bottom:20px;">What You'll Learn in this Masterclass</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              ${course.whatYouLearn.map(item => `
                <div style="display:flex; align-items:flex-start; gap:10px; font-size:0.95rem;">
                  <span style="color:var(--success); font-weight:700;">✓</span>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Syllabus Accordion -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <h3>Course Curriculum & Modules</h3>
              <span style="font-size:0.85rem; color:var(--text-muted);">${course.lessonsCount} lessons • ${course.duration} total</span>
            </div>

            <div class="syllabus-accordion">
              ${course.curriculum.map((mod, modIdx) => `
                <div class="accordion-item">
                  <div class="accordion-header" onclick="LearnovaApp.toggleAccordion(this)">
                    <span>${mod.moduleTitle}</span>
                    <span style="font-size:0.85rem; color:var(--text-muted);">${mod.lessons.length} lessons ▾</span>
                  </div>
                  <div class="accordion-body">
                    ${mod.lessons.map(les => `
                      <div class="lesson-row-item">
                        <div style="display:flex; align-items:center; gap:10px;">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          <span>${les.title}</span>
                        </div>
                        <span>${les.duration}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Prerequisites -->
          <div class="card" style="padding:28px;">
            <h3 style="margin-bottom:16px;">Prerequisites & Requirements</h3>
            <ul style="list-style:disc; margin-left:24px; display:flex; flex-direction:column; gap:8px; font-size:0.95rem; color:var(--text-secondary);">
              ${course.requirements.map(req => `<li>${req}</li>`).join('')}
            </ul>
          </div>

          <!-- Instructor Profile -->
          <div class="card" style="padding:32px;">
            <h3 style="margin-bottom:16px;">About Your Instructor</h3>
            <div style="display:flex; gap:20px; align-items:flex-start;">
              <img src="${course.instructor.avatar}" style="width:72px; height:72px; border-radius:50%; object-fit:cover;">
              <div>
                <h4 style="font-size:1.2rem;">${course.instructor.name}</h4>
                <div style="color:var(--primary); font-weight:600; font-size:0.9rem; margin-bottom:8px;">${course.instructor.role}</div>
                <p style="font-size:0.95rem; line-height:1.6;">${course.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Enrollment Card -->
        <div class="course-detail-sidebar">
          <div class="sticky-enroll-card">
            <div style="width:100%; height:200px; border-radius:var(--radius-md); overflow:hidden; position:relative;">
              <img src="${course.thumbnail}" style="width:100%; height:100%; object-fit:cover;">
              <div class="mockup-play-btn" onclick="LearnovaApp.openClassroom('${course.id}')" title="Preview Trailer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>

            <div style="display:flex; align-items:baseline; gap:12px;">
              <span style="font-size:2.4rem; font-weight:800; font-family:var(--font-heading);">$${course.price}</span>
              <span style="font-size:1.1rem; color:var(--text-muted); text-decoration:line-through;">$${course.originalPrice}</span>
              <span class="badge badge-warning" style="margin-left:auto;">${course.discount}</span>
            </div>

            ${isEnrolled ? `
              <button class="btn btn-primary btn-lg" style="width:100%;" onclick="LearnovaApp.openClassroom('${course.id}')">
                Continue Masterclass
              </button>
            ` : `
              <button class="btn btn-primary btn-lg" style="width:100%;" onclick="LearnovaApp.handleEnrollCourse('${course.id}')">
                Enroll Now (Lifetime Access)
              </button>
            `}

            <button class="btn btn-secondary" style="width:100%;" onclick="LearnovaApp.toggleWishlist('${course.id}')">
              ${isWishlisted ? '❤️ In Your Wishlist' : '♡ Add to Wishlist'}
            </button>

            <div style="font-size:0.85rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:10px; padding-top:16px; border-top:1px solid var(--border-color);">
              <div>🔒 30-Day Money-Back Guarantee</div>
              <div>⚡ Full Lifetime Access with Project Source Files</div>
              <div>📜 Verified Certificate of Mastery on Completion</div>
              <div>📱 Access on Desktop, Tablet, and iOS/Android</div>
            </div>
          </div>
        </div>
      `;

      this.switchView('course-details');
    },

    toggleAccordion(headerEl) {
      const body = headerEl.nextElementSibling;
      if (!body) return;
      if (body.style.display === 'none') {
        body.style.display = 'flex';
        headerEl.querySelector('span:last-child').textContent = headerEl.querySelector('span:last-child').textContent.replace('▸', '▾');
      } else {
        body.style.display = 'none';
        headerEl.querySelector('span:last-child').textContent = headerEl.querySelector('span:last-child').textContent.replace('▾', '▸');
      }
    },

    // Course Enrollment Handler
    handleEnrollCourse(courseId) {
      if (!this.state.enrolled[courseId]) {
        this.state.enrolled[courseId] = {
          completedLessons: [],
          progress: 0,
          quizPassed: false,
          notes: ''
        };
        this.saveEnrolled();
        this.showToast('Enrollment successful! Welcome to the class.', 'success');
      }
      this.openClassroom(courseId);
    },

    // Classroom Video Learning Experience
    openClassroom(courseId, targetLessonId = null) {
      const course = this.state.courses.find(c => c.id === courseId);
      if (!course) return;

      this.state.activeCourseId = courseId;
      if (!this.state.enrolled[courseId]) {
        this.state.enrolled[courseId] = { completedLessons: [], progress: 0, quizPassed: false, notes: '' };
        this.saveEnrolled();
      }

      // Determine initial lesson
      const allLessons = [];
      course.curriculum.forEach((mod, modIdx) => {
        mod.lessons.forEach((les, lesIdx) => {
          allLessons.push({ ...les, modIdx, lesIdx, modTitle: mod.moduleTitle });
        });
      });

      let currentLesson = allLessons[0];
      if (targetLessonId) {
        const found = allLessons.find(l => l.id === targetLessonId);
        if (found) currentLesson = found;
      }

      this.state.activeLessonId = currentLesson.id;

      // Update Classroom Header
      document.getElementById('player-course-category').textContent = course.categoryName;
      document.getElementById('player-course-title').textContent = course.title;
      document.getElementById('current-lesson-title').textContent = currentLesson.title;
      document.getElementById('current-lesson-duration').textContent = `Duration: ${currentLesson.duration}`;

      // Update Video Element
      const videoEl = document.getElementById('classroom-video-element');
      if (videoEl) {
        videoEl.src = currentLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
        videoEl.load();
      }

      // Update Notes Textarea
      const notesEl = document.getElementById('lesson-notes-textarea');
      if (notesEl) {
        notesEl.value = this.state.enrolled[courseId].notes || '';
      }

      // Show/Hide Certificate button based on quiz status or 100% progress
      const certBtn = document.getElementById('classroom-view-cert-btn');
      if (certBtn) {
        const isPassed = this.state.enrolled[courseId].quizPassed || this.state.enrolled[courseId].progress >= 100;
        certBtn.style.display = isPassed ? 'inline-flex' : 'none';
      }

      this.renderClassroomCurriculumList(course, currentLesson.id);
      this.switchView('classroom');
    },

    renderClassroomCurriculumList(course, activeLessonId) {
      const listContainer = document.getElementById('classroom-lessons-list');
      if (!listContainer) return;

      const userCourseState = this.state.enrolled[course.id] || { completedLessons: [], progress: 0 };
      const completedSet = new Set(userCourseState.completedLessons);

      let totalLessons = 0;
      course.curriculum.forEach(m => totalLessons += m.lessons.length);
      const percent = Math.round((completedSet.size / Math.max(totalLessons, 1)) * 100);
      userCourseState.progress = percent;

      document.getElementById('classroom-progress-percentage').textContent = `${percent}%`;
      document.getElementById('classroom-progress-fill').style.width = `${percent}%`;

      listContainer.innerHTML = course.curriculum.map(mod => `
        <div style="margin-bottom:14px;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px;">
            ${mod.moduleTitle}
          </div>
          ${mod.lessons.map(les => {
            const isCompleted = completedSet.has(les.id);
            const isActive = les.id === activeLessonId;
            return `
              <div class="lesson-list-item ${isActive ? 'active' : ''}" onclick="LearnovaApp.openClassroom('${course.id}', '${les.id}')">
                <div class="lesson-status-icon ${isCompleted ? 'completed' : (isActive ? 'in-progress' : 'pending')}">
                  ${isCompleted ? '✓' : (isActive ? '▶' : '○')}
                </div>
                <div style="font-size:0.85rem; flex-grow:1; color:${isActive ? 'var(--text-primary)' : 'var(--text-secondary)'}; font-weight:${isActive ? '600' : '400'};">
                  ${les.title}
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${les.duration}</div>
              </div>
            `;
          }).join('')}
        </div>
      `).join('');
    },

    markCurrentLessonComplete() {
      const courseId = this.state.activeCourseId;
      const lessonId = this.state.activeLessonId;
      if (!this.state.enrolled[courseId]) {
        this.state.enrolled[courseId] = { completedLessons: [], progress: 0, quizPassed: false, notes: '' };
      }

      const completed = this.state.enrolled[courseId].completedLessons;
      if (!completed.includes(lessonId)) {
        completed.push(lessonId);
      } else {
        // Toggle off
        const idx = completed.indexOf(lessonId);
        completed.splice(idx, 1);
      }

      this.saveEnrolled();
      const course = this.state.courses.find(c => c.id === courseId);
      this.renderClassroomCurriculumList(course, lessonId);
      this.showToast('Lesson progress updated!', 'success');

      // Auto check if completed
      let totalLessons = 0;
      course.curriculum.forEach(m => totalLessons += m.lessons.length);
      if (completed.length >= totalLessons) {
        this.showToast('🎉 Masterclass completed! You unlocked your verified Certificate!', 'success');
        document.getElementById('classroom-view-cert-btn').style.display = 'inline-flex';
      }
    },

    navigateLesson(offset) {
      const course = this.state.courses.find(c => c.id === this.state.activeCourseId);
      if (!course) return;

      const flat = [];
      course.curriculum.forEach(m => m.lessons.forEach(l => flat.push(l)));
      const currIdx = flat.findIndex(l => l.id === this.state.activeLessonId);
      const targetIdx = currIdx + offset;

      if (targetIdx >= 0 && targetIdx < flat.length) {
        this.openClassroom(course.id, flat[targetIdx].id);
      } else {
        this.showToast(offset > 0 ? 'You are at the final lesson!' : 'You are at the first lesson!', 'info');
      }
    },

    addDiscussionMessage(text) {
      const thread = document.getElementById('discussion-thread-container');
      if (!thread) return;

      const newMsg = document.createElement('div');
      newMsg.className = 'card';
      newMsg.style.padding = '16px';
      newMsg.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <strong style="font-size:0.9rem;">${this.state.user.name}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);">Just now</span>
        </div>
        <p style="font-size:0.9rem;">${text}</p>
      `;
      thread.prepend(newMsg);
      this.showToast('Question posted to community board', 'success');
    },

    // Interactive Quiz System
    openQuiz(courseId) {
      const course = this.state.courses.find(c => c.id === courseId);
      if (!course || !course.quiz || course.quiz.length === 0) {
        this.showToast('Assessment coming soon for this masterclass.', 'info');
        return;
      }

      this.state.activeCourseId = courseId;
      this.state.quizState.questions = course.quiz;
      this.state.quizState.currentIndex = 0;
      this.state.quizState.selectedAnswers = {};
      this.state.quizState.score = 0;
      this.state.quizState.timeLeft = 600;

      document.getElementById('quiz-course-name').textContent = course.title;
      document.getElementById('quiz-active-screen').style.display = 'block';
      document.getElementById('quiz-result-screen').style.display = 'none';

      this.startQuizTimer();
      this.renderQuizQuestion();
      this.switchView('quiz');
    },

    startQuizTimer() {
      if (this.state.quizState.timerInterval) {
        clearInterval(this.state.quizState.timerInterval);
      }
      const self = this;
      const timerDisplay = document.getElementById('quiz-timer-display');

      this.state.quizState.timerInterval = setInterval(() => {
        self.state.quizState.timeLeft--;
        const mins = Math.floor(self.state.quizState.timeLeft / 60);
        const secs = self.state.quizState.timeLeft % 60;
        if (timerDisplay) {
          timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        if (self.state.quizState.timeLeft <= 0) {
          clearInterval(self.state.quizState.timerInterval);
          self.finishQuiz();
        }
      }, 1000);
    },

    renderQuizQuestion() {
      const qState = this.state.quizState;
      const question = qState.questions[qState.currentIndex];
      if (!question) return;

      document.getElementById('quiz-question-counter').textContent = `Question ${qState.currentIndex + 1} of ${qState.questions.length}`;
      document.getElementById('quiz-question-text').textContent = question.question;

      const optionsContainer = document.getElementById('quiz-options-container');
      const selected = qState.selectedAnswers[qState.currentIndex];

      optionsContainer.innerHTML = question.options.map((opt, idx) => `
        <div class="quiz-option-card ${selected === idx ? 'selected' : ''}" onclick="LearnovaApp.selectQuizOption(${idx})">
          <div style="width:24px; height:24px; border-radius:50%; border:2px solid ${selected === idx ? 'var(--primary)' : 'var(--border-color)'}; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:700;">
            ${String.fromCharCode(65 + idx)}
          </div>
          <span style="font-size:0.95rem;">${opt}</span>
        </div>
      `).join('');

      const submitBtn = document.getElementById('quiz-submit-btn');
      if (qState.currentIndex === qState.questions.length - 1) {
        submitBtn.textContent = 'Submit Assessment';
      } else {
        submitBtn.textContent = 'Next Question';
      }
    },

    selectQuizOption(index) {
      this.state.quizState.selectedAnswers[this.state.quizState.currentIndex] = index;
      this.renderQuizQuestion();
    },

    navigateQuizQuestion(offset) {
      const qState = this.state.quizState;
      const target = qState.currentIndex + offset;
      if (target >= 0 && target < qState.questions.length) {
        qState.currentIndex = target;
        this.renderQuizQuestion();
      }
    },

    submitQuizAnswer() {
      const qState = this.state.quizState;
      if (qState.selectedAnswers[qState.currentIndex] === undefined) {
        this.showToast('Please select an option before continuing.', 'warning');
        return;
      }

      if (qState.currentIndex < qState.questions.length - 1) {
        qState.currentIndex++;
        this.renderQuizQuestion();
      } else {
        this.finishQuiz();
      }
    },

    finishQuiz() {
      if (this.state.quizState.timerInterval) {
        clearInterval(this.state.quizState.timerInterval);
      }

      const qState = this.state.quizState;
      let correct = 0;
      qState.questions.forEach((q, idx) => {
        if (qState.selectedAnswers[idx] === q.correct) correct++;
      });

      const percentage = Math.round((correct / qState.questions.length) * 100);
      const passed = percentage >= 75;

      document.getElementById('quiz-active-screen').style.display = 'none';
      document.getElementById('quiz-result-screen').style.display = 'block';

      document.getElementById('quiz-final-score').textContent = `${percentage}%`;
      document.getElementById('quiz-correct-count').textContent = `${correct} / ${qState.questions.length}`;

      const title = document.getElementById('quiz-result-title');
      const msg = document.getElementById('quiz-result-message');
      const claimBtn = document.getElementById('quiz-claim-cert-btn');

      if (passed) {
        title.textContent = 'Mastery Exam Passed! 🏆';
        msg.textContent = `Exceptional performance! You scored ${percentage}% and unlocked your verified credential.`;
        claimBtn.style.display = 'inline-flex';

        // Persist quiz passed
        if (!this.state.enrolled[this.state.activeCourseId]) {
          this.state.enrolled[this.state.activeCourseId] = { completedLessons: [], progress: 100, quizPassed: true, notes: '' };
        } else {
          this.state.enrolled[this.state.activeCourseId].quizPassed = true;
          this.state.enrolled[this.state.activeCourseId].progress = 100;
        }
        this.saveEnrolled();
        this.showToast('Certificate unlocked!', 'success');
      } else {
        title.textContent = 'Assessment Needs Revision';
        msg.textContent = `You scored ${percentage}%. You need 75% or higher to unlock the official certificate. You can review and retry.`;
        claimBtn.style.display = 'none';
      }
    },

    resetQuiz() {
      this.openQuiz(this.state.activeCourseId);
    },

    // Certificate Generator View
    openCertificate(courseId) {
      const course = this.state.courses.find(c => c.id === courseId);
      if (!course) return;

      document.getElementById('cert-rendered-student-name').textContent = this.state.user.name;
      document.getElementById('cert-rendered-course-name').textContent = course.title;
      document.getElementById('cert-rendered-instructor').textContent = course.instructor.name;

      const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('cert-rendered-date').textContent = dateStr;

      const randomId = `LNV-${Math.floor(100000 + Math.random() * 900000)}-VERIFIED`;
      document.getElementById('cert-rendered-id').textContent = randomId;

      this.switchView('certificate');
    },

    // Student Dashboard
    renderStudentDashboard() {
      const container = document.getElementById('student-enrolled-grid');
      if (!container) return;

      const enrolledIds = Object.keys(this.state.enrolled);
      document.getElementById('dash-enrolled-count').textContent = enrolledIds.length;

      let certCount = 0;
      Object.values(this.state.enrolled).forEach(item => {
        if (item.quizPassed || item.progress >= 100) certCount++;
      });
      document.getElementById('dash-certificates-count').textContent = certCount;

      const enrolledCourses = this.state.courses.filter(c => enrolledIds.includes(c.id));

      if (enrolledCourses.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align:center; padding:40px;">
            <p>You haven't enrolled in any courses yet.</p>
            <button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="LearnovaApp.switchView('landing')">Explore Catalog</button>
          </div>
        `;
        return;
      }

      container.innerHTML = enrolledCourses.map(course => this.renderCourseCardHTML(course)).join('');
    },

    switchStudentSubTab(subTab) {
      document.querySelectorAll('.dashboard-sidebar .dashboard-nav-item').forEach(item => {
        if (item.getAttribute('data-sub') === subTab) item.classList.add('active');
        else item.classList.remove('active');
      });

      const container = document.getElementById('student-enrolled-grid');
      if (!container) return;

      if (subTab === 'my-courses') {
        this.renderStudentDashboard();
      } else if (subTab === 'wishlist') {
        const wishlistCourses = this.state.courses.filter(c => this.state.wishlist.includes(c.id));
        if (wishlistCourses.length === 0) {
          container.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding:40px;"><p>Your wishlist is empty.</p></div>';
        } else {
          container.innerHTML = wishlistCourses.map(course => this.renderCourseCardHTML(course)).join('');
        }
      } else if (subTab === 'certificates') {
        const certCourses = this.state.courses.filter(c => {
          const st = this.state.enrolled[c.id];
          return st && (st.quizPassed || st.progress >= 100);
        });
        if (certCourses.length === 0) {
          container.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding:40px;"><p>Complete a course or pass a quiz to claim certificates.</p></div>';
        } else {
          container.innerHTML = certCourses.map(course => `
            <div class="card" style="padding:24px; text-align:center;">
              <div style="font-size:2rem; margin-bottom:12px;">🏆</div>
              <h4 style="margin-bottom:8px;">${course.title}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px;">Verified Certificate Issued</p>
              <button class="btn btn-primary btn-sm" onclick="LearnovaApp.openCertificate('${course.id}')">View Credential</button>
            </div>
          `).join('');
        }
      } else if (subTab === 'notes') {
        const notesList = [];
        Object.entries(this.state.enrolled).forEach(([courseId, data]) => {
          if (data.notes && data.notes.trim()) {
            const course = this.state.courses.find(c => c.id === courseId);
            if (course) notesList.push({ course, notes: data.notes });
          }
        });

        if (notesList.length === 0) {
          container.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding:40px;"><p>No notes written yet. Open any lesson classroom to take notes.</p></div>';
        } else {
          container.innerHTML = notesList.map(item => `
            <div class="card" style="padding:20px; grid-column: 1 / -1;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <strong>${item.course.title}</strong>
                <button class="btn btn-outline btn-sm" onclick="LearnovaApp.openClassroom('${item.course.id}')">Open Class</button>
              </div>
              <pre style="background:var(--bg-surface-elevated); padding:14px; border-radius:var(--radius-sm); font-family:monospace; white-space:pre-wrap; font-size:0.88rem;">${item.notes}</pre>
            </div>
          `).join('');
        }
      }
    },

    // Instructor Studio Dashboard
    renderInstructorDashboard() {
      const tbody = document.getElementById('instructor-courses-table-body');
      if (!tbody) return;

      tbody.innerHTML = this.state.courses.slice(0, 5).map(course => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${course.thumbnail}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;">
              <strong>${course.title}</strong>
            </div>
          </td>
          <td><span class="badge badge-primary">${course.categoryName}</span></td>
          <td>${course.studentsCount.toLocaleString()}</td>
          <td>$${course.price}</td>
          <td><span class="badge badge-success">Live & Published</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="LearnovaApp.openCourseDetail('${course.id}')">Edit</button>
          </td>
        </tr>
      `).join('');
    },

    handleCreateCourse() {
      const title = document.getElementById('new-course-title').value.trim();
      const category = document.getElementById('new-course-category').value;
      const difficulty = document.getElementById('new-course-difficulty').value;
      const price = parseFloat(document.getElementById('new-course-price').value) || 79.99;
      const duration = document.getElementById('new-course-duration').value.trim() || '24 hours';
      const thumbnail = document.getElementById('new-course-thumbnail').value.trim();
      const desc = document.getElementById('new-course-desc').value.trim();

      const catObj = this.state.categories.find(c => c.id === category);

      const newCourse = {
        id: 'c-custom-' + Date.now(),
        title,
        category,
        categoryName: catObj ? catObj.name : 'Engineering',
        instructor: {
          name: this.state.user.name,
          role: 'Instructor Fellow',
          avatar: this.state.user.avatar,
          bio: 'Author of high performance distributed systems and engineering patterns.'
        },
        rating: 5.0,
        reviewCount: 1,
        studentsCount: 1,
        duration,
        lessonsCount: 12,
        difficulty,
        price,
        originalPrice: Math.round(price * 1.5),
        discount: '33% OFF',
        featured: true,
        thumbnail,
        description: desc,
        whatYouLearn: [
          'Architect production systems from scratch',
          'Optimize execution throughput and resilience',
          'Deploy automated microservices in Kubernetes',
          'Follow standard enterprise engineering designs'
        ],
        requirements: ['Basic computer science fundamentals'],
        curriculum: [
          {
            moduleTitle: 'Module 1: Foundations & Architecture',
            lessons: [
              { id: 'custom-l1', title: '1.1 System Foundations & Environment Setup', duration: '15:00', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
              { id: 'custom-l2', title: '1.2 Core Logic & Data Pipelines', duration: '20:00', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
            ]
          }
        ],
        quiz: [
          {
            question: 'What is the primary objective of this architecture?',
            options: ['High Availability and Scalability', 'Increasing Server Latency', 'Deleting Databases', 'Manual Deployments'],
            correct: 0
          }
        ]
      };

      this.state.courses.unshift(newCourse);

      // Save custom courses
      const storedCustomCourses = localStorage.getItem('learnova_custom_courses');
      const customList = storedCustomCourses ? JSON.parse(storedCustomCourses) : [];
      customList.unshift(newCourse);
      localStorage.setItem('learnova_custom_courses', JSON.stringify(customList));

      this.dom.createCourseModal.classList.remove('active');
      this.dom.createCourseForm.reset();
      this.filterAndRenderCourses();
      this.renderInstructorDashboard();
      this.showToast('Masterclass created and published live!', 'success');
    },

    // Admin Control Panel
    renderAdminDashboard() {
      const tbody = document.getElementById('admin-users-table-body');
      if (!tbody) return;

      tbody.innerHTML = this.state.adminUsers.map(u => `
        <tr>
          <td>
            <div style="font-weight:700;">${u.name}</div>
          </td>
          <td>${u.email}</td>
          <td><span class="badge ${u.role === 'Instructor' ? 'badge-violet' : 'badge-primary'}">${u.role}</span></td>
          <td>
            <span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-warning'}">${u.status}</span>
          </td>
          <td>${u.joined}</td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="LearnovaApp.toggleUserStatus('${u.id}')">Toggle Status</button>
          </td>
        </tr>
      `).join('');
    },

    toggleUserStatus(userId) {
      const user = this.state.adminUsers.find(u => u.id === userId);
      if (user) {
        user.status = user.status === 'Active' ? 'Suspended' : 'Active';
        this.renderAdminDashboard();
        this.showToast(`User ${user.name} is now ${user.status}`, 'info');
      }
    },

    // Messaging & Inbox
    renderMessagingUI() {
      const threadsContainer = document.getElementById('chat-threads-container');
      if (!threadsContainer) return;

      threadsContainer.innerHTML = this.state.conversations.map(conv => `
        <div class="lesson-list-item ${conv.id === this.state.activeChatId ? 'active' : ''}" onclick="LearnovaApp.selectChatThread('${conv.id}')">
          <img src="${conv.avatar}" class="user-avatar-img">
          <div style="flex-grow:1; min-width:0;">
            <div style="display:flex; justify-content:space-between; font-size:0.88rem; font-weight:700;">
              <span>${conv.participant}</span>
              <span style="font-size:0.75rem; color:var(--text-muted);">${conv.lastTime}</span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-secondary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${conv.lastMessage}
            </div>
          </div>
        </div>
      `).join('');

      this.renderActiveChatMessages();
    },

    selectChatThread(convId) {
      this.state.activeChatId = convId;
      this.renderMessagingUI();
    },

    renderActiveChatMessages() {
      const conv = this.state.conversations.find(c => c.id === this.state.activeChatId);
      if (!conv) return;

      document.getElementById('active-chat-name').textContent = conv.participant;
      document.getElementById('active-chat-avatar').src = conv.avatar;

      const container = document.getElementById('chat-messages-container');
      if (!container) return;

      container.innerHTML = conv.messages.map(msg => `
        <div class="chat-bubble ${msg.sender === 'me' ? 'sent' : 'received'}">
          <div>${msg.text}</div>
          <div style="font-size:0.7rem; opacity:0.7; text-align:right; margin-top:4px;">${msg.time}</div>
        </div>
      `).join('');

      container.scrollTop = container.scrollHeight;
    },

    handleSendChatMessage() {
      const input = document.getElementById('chat-input-field');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      const conv = this.state.conversations.find(c => c.id === this.state.activeChatId);
      if (!conv) return;

      conv.messages.push({
        sender: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      conv.lastMessage = text;
      conv.lastTime = 'Just now';
      input.value = '';

      this.renderActiveChatMessages();

      // Simulated auto response from instructor
      setTimeout(() => {
        conv.messages.push({
          sender: 'them',
          text: `Thanks for following up, ${this.state.user.name.split(' ')[0]}! Reviewing this in our office hours right now.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        this.renderActiveChatMessages();
      }, 1400);
    },

    // Wishlist Toggle
    toggleWishlist(courseId) {
      const idx = this.state.wishlist.indexOf(courseId);
      if (idx >= 0) {
        this.state.wishlist.splice(idx, 1);
        this.showToast('Removed from Wishlist', 'info');
      } else {
        this.state.wishlist.push(courseId);
        this.showToast('Added to Wishlist!', 'success');
      }
      this.saveWishlist();
      this.filterAndRenderCourses();
    },

    updateWishlistAndEnrolledBadges() {
      if (this.dom.wishlistCount) {
        this.dom.wishlistCount.textContent = this.state.wishlist.length;
      }
    },

    // Notifications Dropdown Renderer
    renderNotificationCenter() {
      const itemsContainer = this.dom.notifItems;
      if (!itemsContainer) return;

      const unreadCount = this.state.notifications.filter(n => !n.read).length;
      if (this.dom.notifCount) {
        this.dom.notifCount.textContent = unreadCount;
        this.dom.notifCount.style.display = unreadCount > 0 ? 'flex' : 'none';
      }

      itemsContainer.innerHTML = this.state.notifications.map(n => `
        <div class="notif-item ${n.read ? '' : 'unread'}" onclick="LearnovaApp.markNotifRead('${n.id}')">
          <div style="width:32px; height:32px; border-radius:50%; background:rgba(59, 130, 246, 0.15); color:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            ⚡
          </div>
          <div>
            <div style="font-size:0.88rem; font-weight:700;">${n.title}</div>
            <div style="font-size:0.8rem; color:var(--text-secondary);">${n.message}</div>
            <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">${n.time}</div>
          </div>
        </div>
      `).join('');
    },

    markNotifRead(id) {
      const notif = this.state.notifications.find(n => n.id === id);
      if (notif) notif.read = true;
      this.saveNotifications();
    },

    // Global Command Palette Search
    openSearchModal() {
      this.dom.searchModal.classList.add('active');
      setTimeout(() => this.dom.commandInput.focus(), 50);
    },

    closeSearchModal() {
      this.dom.searchModal.classList.remove('active');
    },

    handleCommandSearch(query) {
      const resultsContainer = this.dom.commandResults;
      if (!resultsContainer) return;

      query = query.toLowerCase().trim();
      if (!query) {
        resultsContainer.innerHTML = `
          <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; padding:8px 0;">Popular Suggestions</div>
          <div class="card" style="padding:12px; cursor:pointer;" onclick="LearnovaApp.openCourseDetail('c1'); LearnovaApp.closeAllModals();">
            <strong>Full-Stack Web Architect: React, Node & TypeScript</strong>
            <div style="font-size:0.8rem; color:var(--text-muted);">Web Development • Dr. Alexander Vance</div>
          </div>
          <div class="card" style="padding:12px; cursor:pointer;" onclick="LearnovaApp.openCourseDetail('c2'); LearnovaApp.closeAllModals();">
            <strong>Generative AI & LLM Systems Engineering with PyTorch</strong>
            <div style="font-size:0.8rem; color:var(--text-muted);">Artificial Intelligence • Dr. Elena Rostova</div>
          </div>
        `;
        return;
      }

      const matches = this.state.courses.filter(c => {
        return c.title.toLowerCase().includes(query) ||
               c.categoryName.toLowerCase().includes(query) ||
               c.instructor.name.toLowerCase().includes(query);
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="padding:20px; text-align:center; color:var(--text-muted);">No matches found for "${query}"</div>`;
        return;
      }

      resultsContainer.innerHTML = matches.map(c => `
        <div class="card" style="padding:12px; cursor:pointer;" onclick="LearnovaApp.openCourseDetail('${c.id}'); LearnovaApp.closeAllModals();">
          <strong>${c.title}</strong>
          <div style="font-size:0.8rem; color:var(--text-muted);">${c.categoryName} • ${c.instructor.name} • $${c.price}</div>
        </div>
      `).join('');
    },

    // Authentication Modals & State
    openAuthModal(tab = 'login') {
      this.dom.authModal.classList.add('active');
      const authTabLogin = document.getElementById('auth-tab-login');
      const authTabRegister = document.getElementById('auth-tab-register');
      const loginForm = document.getElementById('login-form');
      const registerForm = document.getElementById('register-form');

      if (tab === 'login') {
        authTabLogin.classList.add('active');
        authTabRegister.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
      } else {
        authTabRegister.classList.add('active');
        authTabLogin.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
      }
    },

    closeAuthModal() {
      this.dom.authModal.classList.remove('active');
    },

    closeAllModals() {
      if (this.dom.authModal) this.dom.authModal.classList.remove('active');
      if (this.dom.searchModal) this.dom.searchModal.classList.remove('active');
      if (this.dom.createCourseModal) this.dom.createCourseModal.classList.remove('active');
    },

    handleAuthSuccess(userObj) {
      this.state.user = {
        ...this.state.user,
        ...userObj
      };
      localStorage.setItem('learnova_user', JSON.stringify(this.state.user));
      this.closeAuthModal();
      this.updateUserAuthUI();
      this.showToast(`Welcome to Learnova, ${this.state.user.name}!`, 'success');
    },

    updateUserAuthUI() {
      const container = this.dom.authButtonsContainer;
      if (!container) return;

      if (this.state.user && this.state.user.name) {
        container.innerHTML = `
          <div class="user-avatar-btn" onclick="LearnovaApp.switchView('student-dashboard')">
            <img src="${this.state.user.avatar}" class="user-avatar-img">
            <span class="user-avatar-name">${this.state.user.name.split(' ')[0]}</span>
          </div>
        `;
      } else {
        container.innerHTML = `<button class="btn btn-primary btn-sm" id="nav-login-btn" onclick="LearnovaApp.openAuthModal('login')">Sign In</button>`;
      }
    },

    // Light / Dark Theme Toggler
    toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      this.state.theme = next;
      localStorage.setItem('learnova_theme', next);
      this.updateThemeIcons(next);
      this.showToast(`${next === 'dark' ? 'Dark' : 'Light'} theme activated`, 'info');
    },

    updateThemeIcons(theme) {
      if (this.dom.themeIconSun && this.dom.themeIconMoon) {
        if (theme === 'dark') {
          this.dom.themeIconSun.style.display = 'block';
          this.dom.themeIconMoon.style.display = 'none';
        } else {
          this.dom.themeIconSun.style.display = 'none';
          this.dom.themeIconMoon.style.display = 'block';
        }
      }
    },

    // Static Sections Data Rendering
    renderTestimonials() {
      const container = document.getElementById('testimonials-container');
      if (!container) return;

      container.innerHTML = LEARNOVA_DATA.testimonials.map(t => `
        <div class="card" style="padding:28px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="color:#F59E0B; font-size:1.1rem; margin-bottom:12px;">★★★★★</div>
            <p style="font-size:0.95rem; line-height:1.6; margin-bottom:20px; font-style:italic;">"${t.content}"</p>
          </div>
          <div style="display:flex; align-items:center; gap:12px; padding-top:16px; border-top:1px solid var(--border-color);">
            <img src="${t.avatar}" style="width:42px; height:42px; border-radius:50%; object-fit:cover;">
            <div>
              <div style="font-weight:700; font-size:0.92rem;">${t.name}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${t.role}</div>
            </div>
          </div>
        </div>
      `).join('');
    },

    renderFAQs() {
      const container = document.getElementById('faq-accordion-container');
      if (!container) return;

      container.innerHTML = LEARNOVA_DATA.faqs.map((faq, idx) => `
        <div class="accordion-item">
          <div class="accordion-header" onclick="LearnovaApp.toggleAccordion(this)">
            <span>${faq.question}</span>
            <span style="font-size:0.85rem; color:var(--text-muted);">${idx === 0 ? '▾' : '▸'}</span>
          </div>
          <div class="accordion-body" style="display:${idx === 0 ? 'flex' : 'none'};">
            <p style="font-size:0.95rem; line-height:1.6; color:var(--text-secondary);">${faq.answer}</p>
          </div>
        </div>
      `).join('');
    },

    // Contact & Newsletter Handlers
    handleContactSubmit() {
      const name = document.getElementById('contact-name').value;
      this.showToast(`Thank you ${name}. Your message has been sent to our team!`, 'success');
      document.getElementById('contact-form').reset();
    },

    handleNewsletterSubscribe() {
      const input = document.getElementById('footer-newsletter-input');
      if (!input || !input.value.trim()) {
        this.showToast('Please provide a valid email address.', 'warning');
        return;
      }
      this.showToast('Subscribed! Welcome to Learnova Engineering Dispatch.', 'success');
      input.value = '';
    },

    // Toast Notification Utility
    showToast(message, type = 'info') {
      const container = this.dom.toastContainer;
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';

      let icon = 'ℹ️';
      if (type === 'success') icon = '✅';
      else if (type === 'warning') icon = '⚠️';
      else if (type === 'danger') icon = '❌';

      toast.innerHTML = `
        <span style="font-size:1.1rem;">${icon}</span>
        <span style="font-size:0.92rem; font-weight:500;">${message}</span>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }
  };

  // Expose to window for inline event triggers
  window.LearnovaApp = LearnovaApp;

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LearnovaApp.init());
  } else {
    LearnovaApp.init();
  }

})();
