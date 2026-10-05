/**
 * ==============================================================================
 * SIBLING DIGITAL GIFT WEBSITE - APPLICATION LOGIC (العربية)
 * محرك التفاعل الخاص بالهدية الرقمية مع دعم كامل للغة العربية والـ RTL
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. CONFIGURATION SAFE RETRIEVAL
  // ----------------------------------------------------------------------------
  const CONFIG = window.SIBLING_GIFT_CONFIG || {
    recipientName: "MK",
    senderName: "أخوكي",
    relationshipBadge: "أحلى أخت في الدنيا 🏆",
    secretPassword: "Suss",
    passwordHint: "💡 تلميح: جربي 'Suss' (الكلمة السرية بتاعتنا!)",
    envelopeText: "رسالة خاصة لأغلى أخت ✉️",
    envelopeInstruction: "دوسي على الظرف لفتحه 💌",
    prePasswordMessage: "مش عارف هتكون ردة فعلك إيه... بس حبيت أعملك حاجة مخصوص بمناسبة عيد ميلادك تجمع أحلى ذكرياتنا وضحكاتنا سوا.",
    welcomeMessage: "كل حاجة هنا مننا ولينا... تفاصيل ومواقف صغيرة وضحكات يمكن ماتعرفيش إني لسه فاكرها كلها. كل سنة وإنتي طيبة وعقبال مليون سنة سعادة ونجاح! 🎂✨",
    headerTitle: "شوية من ذكرياتنا البسيطه جمعتها هنا ✨",
    headerSubtitle: "",
    relationshipStartDate: "2003-02-10",
    timerSubtext: "سنين وأيام وساعات وثواني من المشاركة، وخروجات الآيس كريم، ووقفتنا في ضهر بعض دايماً! 🤜🤛",
    timeline: [],
    audio: {
      trackTitle: "أغنيتنا والموسيقى الهادية 🎶",
      artistName: "الموسيقى المصاحبة لذكرياتنا",
      audioSrc: "assets/audio/our-song.mp3",
      coverImg: "assets/images/memory1.jpg"
    },
    photoMoments: [],
    hiddenGift: {
      boxText: "لسه في حاجة مخبيهالك... 🎁",
      revealTitle: "لقيتي الهدية والمفاجأة المخفية! 🎉",
      vouchers: [],
      secretLetter: "كل سنة وإنتي طيبة يا MK! بحبك دايماً وفخور بيكي! 💛"
    },
    gallery: []
  };

  // State
  let isEnvelopeOpen = false;
  let isAudioPlaying = false;
  let currentLightboxIndex = 0;
  let allGalleryItems = [];
  let synthAudioCtx = null;
  let synthInterval = null;

  // Screen-by-Screen Journey Management State
  const DASHBOARD_SCREENS = [
    { id: 'counter-section', title: 'عداد الأخوة ⏳', shortTitle: 'العداد', icon: 'fa-stopwatch' },
    { id: 'timeline-section', title: 'محطات رحلتنا 🗺️', shortTitle: 'المحطات', icon: 'fa-route' },
    { id: 'audio-section', title: 'أغنيتنا المفضلة 🎶', shortTitle: 'الأغنية', icon: 'fa-headphones' },
    { id: 'moments-section', title: 'لقطات خاصة 📸', shortTitle: 'لقطاتنا', icon: 'fa-camera-retro' },
    { id: 'hidden-gift-section', title: 'الهدية المخفية 🎁', shortTitle: 'الهدية', icon: 'fa-gift' },
    { id: 'gallery-section', title: 'ألبوم الصور 🖼️', shortTitle: 'الألبوم', icon: 'fa-photo-film' },
    { id: 'celebration-section', title: 'ختام الهدية 💛', shortTitle: 'الختام', icon: 'fa-heart' }
  ];

  let currentDashboardScreenIndex = 0;
  let isContinuousScrollMode = false;
  let isScreenTransitioning = false;

  // ----------------------------------------------------------------------------
  // 2. DOM INITIALIZATION
  // ----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    populateStaticContent();
    setupEnvelope();
    setupPasswordGate();
    setupWelcomeScreen();
    setupDashboardScreens();
    setupLiveCounter();
    setupAudioPlayer();
    setupPhotoMoments();
    setupHiddenGift();
    setupGallery();
    setupNavigation();
    setupConfettiCanvas();
  });

  // ----------------------------------------------------------------------------
  // 3. POPULATE CONTENT FROM CONFIG (ملء المحتوى باللغة العربية)
  // ----------------------------------------------------------------------------
  function populateStaticContent() {
    // Envelope & Seals
    setTxt('envelope-recipient-name', CONFIG.envelopeText || `رسالة خاصة لـ ${CONFIG.recipientName} ✉️`);
    setTxt('seal-monogram', (CONFIG.recipientName || 'MK').substring(0, 3).toUpperCase());
    setTxt('letter-title', `أهلاً ${CONFIG.recipientName}! 🎉`);
    setTxt('pre-password-text', `"${CONFIG.prePasswordMessage}"`);
    setTxt('envelope-instruction', CONFIG.envelopeInstruction || "دوسي على الظرف لفتحه 💌");

    // Password Hint
    setTxt('hint-text', CONFIG.passwordHint || "💡 تلميح: جربي 'Suss'");

    // Welcome Screen
    setTxt('welcome-title', `أهلاً بيكي يا أغلى أخت! 🌟`);
    setTxt('welcome-text', `"${CONFIG.welcomeMessage}"`);

    // Nav & Hero
    setTxt('nav-brand-title', `${CONFIG.recipientName} و${CONFIG.senderName} 💛`);
    setTxt('nav-brand-badge', CONFIG.relationshipBadge || "أحلى أخت في الدنيا 🏆");
    setTxt('hero-badge-1', CONFIG.relationshipBadge || "أحلى أخت في الكون 🏆");
    setTxt('dashboard-hero-title', CONFIG.headerTitle || "شوية من ذكرياتنا البسيطه جمعتها هنا ✨");
    const subEl = document.getElementById('dashboard-hero-subtitle');
    if (subEl) {
      if (CONFIG.headerSubtitle) {
        subEl.textContent = CONFIG.headerSubtitle;
        subEl.style.display = '';
      } else {
        subEl.textContent = '';
        subEl.style.display = 'none';
      }
    }
    setTxt('counter-subtext', CONFIG.timerSubtext || "سنين وأيام من الذكريات الجميلة والمواقف الحلوة!");

    // Footer
    setTxt('footer-author', `صُنعت بكل حب لعيد ميلاد ${CONFIG.recipientName} بواسطة ${CONFIG.senderName}`);

    // Render Timeline
    renderTimeline();

    // Render Audio Details
    if (CONFIG.audio) {
      setTxt('track-title', CONFIG.audio.trackTitle || "أغنيتنا والموسيقى الهادية");
      setTxt('track-artist', CONFIG.audio.artistName || "الموسيقى المصاحبة لذكرياتنا");
      const cover = document.getElementById('audio-cover-img');
      if (cover && CONFIG.audio.coverImg) cover.src = CONFIG.audio.coverImg;
      const audioElem = document.getElementById('main-audio-element');
      if (audioElem && CONFIG.audio.audioSrc) audioElem.src = CONFIG.audio.audioSrc;
    }

    // Render Hidden Gift letter & Vouchers
    if (CONFIG.hiddenGift) {
      setTxt('gift-heading', CONFIG.hiddenGift.boxText || "لسه في حاجة مخبيهالك... 🎁");
      setTxt('gift-modal-title', CONFIG.hiddenGift.revealTitle || "لقيتي الهدية والمفاجأة المخفية! 🎉");
      setTxt('gift-modal-subtitle', CONFIG.hiddenGift.revealSubtitle || "دي 3 كروت كوبونات أخوية ذهبية رسمية + رسالة خاصة ليكي:");
      setTxt('secret-letter-text', CONFIG.hiddenGift.secretLetter || "");
      const revealImg = document.getElementById('gift-reveal-img');
      const revealWrap = document.getElementById('gift-reveal-img-wrap');
      if (revealImg && CONFIG.hiddenGift.revealImage) {
        revealImg.src = CONFIG.hiddenGift.revealImage;
        if (revealWrap) revealWrap.style.display = 'block';
      }
      renderVouchers();
    }
  }

  function setTxt(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // ----------------------------------------------------------------------------
  // 4. THE 3D ENVELOPE INTERACTION (الظرف التفاعلي المتقن)
  // ----------------------------------------------------------------------------
  function setupEnvelope() {
    const scene = document.getElementById('envelope-scene');
    const seal = document.getElementById('envelope-seal');
    const btnOpenGate = document.getElementById('btn-open-gate');

    function openEnvelope() {
      if (isEnvelopeOpen) return;
      isEnvelopeOpen = true;
      scene.classList.add('is-open');
      playPaperChime();
      triggerConfettiBurst({ particleCount: 35, spread: 65 });
    }

    if (scene) {
      scene.addEventListener('click', (e) => {
        if (e.target.closest('#btn-open-gate')) return;
        openEnvelope();
      });
      scene.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEnvelope();
        }
      });
    }

    if (seal) {
      seal.addEventListener('click', (e) => {
        e.stopPropagation();
        openEnvelope();
      });
    }

    if (btnOpenGate) {
      btnOpenGate.addEventListener('click', (e) => {
        e.stopPropagation();
        switchScreen('landing-screen', 'password-screen');
        setTimeout(() => {
          const pwdInput = document.getElementById('password-input');
          if (pwdInput) pwdInput.focus();
        }, 400);
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 5. PASSWORD GATE SCREEN (شاشة كلمة السر)
  // ----------------------------------------------------------------------------
  function setupPasswordGate() {
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const btnTogglePwd = document.getElementById('btn-toggle-pwd');
    const pwdEyeIcon = document.getElementById('pwd-eye-icon');
    const btnHint = document.getElementById('btn-hint');
    const hintBox = document.getElementById('hint-container');
    const feedback = document.getElementById('feedback-msg');
    const lockIcon = document.getElementById('lock-icon');
    const lockCircle = document.querySelector('.lock-circle');

    // Toggle visibility
    if (btnTogglePwd && input) {
      btnTogglePwd.addEventListener('click', () => {
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        pwdEyeIcon.className = isPwd ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      });
    }

    // Toggle Hint
    if (btnHint && hintBox) {
      btnHint.addEventListener('click', () => {
        hintBox.classList.toggle('show');
      });
    }

    // Handle Form Submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const entered = (input.value || '').trim();
        const expected = (CONFIG.secretPassword || 'Suss').toString().trim();

        if (entered.toLowerCase() === expected.toLowerCase()) {
          // Success!
          feedback.className = 'feedback-msg success';
          feedback.textContent = '🎉 تم التحقق بنجاح! جاري فتح خزانة الذكريات...';
          if (lockIcon) lockIcon.className = 'fa-solid fa-lock-open';
          if (lockCircle) lockCircle.classList.add('unlocked');
          playSuccessChime();
          triggerConfettiBurst({ particleCount: 75, spread: 85 });

          setTimeout(() => {
            switchScreen('password-screen', 'welcome-screen');
          }, 1100);
        } else {
          // Failure!
          feedback.className = 'feedback-msg error';
          feedback.textContent = '❌ كلمة السر غلط! فكري في الكود بتاعنا أو شوفي التلميح 😉';
          const card = document.getElementById('password-box');
          if (card) {
            card.classList.remove('shake-animate');
            void card.offsetWidth;
            card.classList.add('shake-animate');
          }
          input.focus();
          input.select();
        }
      });
    }

    // Return to envelope button
    const btnBackEnv = document.getElementById('btn-back-envelope');
    if (btnBackEnv) {
      btnBackEnv.addEventListener('click', () => {
        switchScreen('password-screen', 'landing-screen', 'backward');
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 6. WELCOME SCREEN TRANSITION (الانتقال للوحة الرئيسية)
  // ----------------------------------------------------------------------------
  function setupWelcomeScreen() {
    const btnEnter = document.getElementById('btn-enter-dashboard');
    if (btnEnter) {
      btnEnter.addEventListener('click', () => {
        switchScreen('welcome-screen', 'main-dashboard', 'forward');
        triggerConfettiBurst({ particleCount: 120, spread: 130 });
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
          tryPlayAudio();
        }, 500);
      });
    }
  }

  // Direction-Aware Top-Level Screen Switcher with Cinematic Animations
  function switchScreen(fromId, toId, direction = 'forward') {
    if (isScreenTransitioning) return;
    isScreenTransitioning = true;

    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);

    const outClass = direction === 'forward' ? 'anim-slide-out-left' : 'anim-slide-out-right';
    const inClass = direction === 'forward' ? 'anim-slide-in-right' : 'anim-slide-in-left';

    if (fromEl) {
      fromEl.classList.add(outClass);
    }

    setTimeout(() => {
      if (fromEl) {
        fromEl.classList.remove('active', outClass);
      }
      if (toEl) {
        toEl.classList.add('active', inClass);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      setTimeout(() => {
        if (toEl) toEl.classList.remove(inClass);
        isScreenTransitioning = false;
      }, 400);
    }, 280);
  }

  // ----------------------------------------------------------------------------
  // 6.5 DASHBOARD SCREEN-BY-SCREEN ENGINE (محرك التنقل بين محطات الهدية)
  // ----------------------------------------------------------------------------
  function setupDashboardScreens() {
    // 1. Hook up all "next", "prev", and "restart" buttons
    document.querySelectorAll('.btn-screen-nav, .btn-restart-journey').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const gotoIndex = parseInt(btn.getAttribute('data-goto'), 10);
        if (!isNaN(gotoIndex)) {
          const dir = gotoIndex >= currentDashboardScreenIndex ? 'forward' : 'backward';
          goToDashboardScreen(gotoIndex, dir);
        }
      });
    });

    // 2. Hook up Quick Nav pills
    document.querySelectorAll('#screen-pills-nav .quick-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(pill.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          const dir = idx >= currentDashboardScreenIndex ? 'forward' : 'backward';
          goToDashboardScreen(idx, dir);
        }
      });
    });

    // 3. Hook up Floating Dock buttons
    document.querySelectorAll('#floating-dock .dock-btn').forEach(dockBtn => {
      dockBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(dockBtn.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          const dir = idx >= currentDashboardScreenIndex ? 'forward' : 'backward';
          goToDashboardScreen(idx, dir);
        }
      });
    });

    // 4. View mode toggle (محطات تفاعلية / تصفح كامل)
    const btnViewMode = document.getElementById('btn-view-mode');
    const dashboard = document.getElementById('main-dashboard');
    if (btnViewMode && dashboard) {
      btnViewMode.addEventListener('click', () => {
        isContinuousScrollMode = !isContinuousScrollMode;
        if (isContinuousScrollMode) {
          dashboard.classList.remove('mode-screens');
          dashboard.classList.add('mode-continuous');
          btnViewMode.classList.add('is-continuous');
          btnViewMode.title = 'التبديل إلى وضع المحطات المنفصلة';
          showToast('📜 تم تفعيل وضع التصفح الكامل لكل الأقسام');
        } else {
          dashboard.classList.remove('mode-continuous');
          dashboard.classList.add('mode-screens');
          btnViewMode.classList.remove('is-continuous');
          btnViewMode.title = 'التبديل إلى وضع التصفح الكامل';
          showToast('📱 تم تفعيل وضع المحطات التفاعلية المنفصلة');
          goToDashboardScreen(currentDashboardScreenIndex, 'forward');
        }
      });
    }

    // 5. Celebration grand confetti button
    const btnGrandConfetti = document.getElementById('btn-grand-confetti');
    if (btnGrandConfetti) {
      btnGrandConfetti.addEventListener('click', () => {
        triggerConfettiBurst({ particleCount: 160, spread: 130 });
        playSuccessChime();
        showToast('🎉 كل سنة وإنتي طيبة وبألف خير يا أغلى أخت! 👑💛');
      });
    }

    // 6. Keyboard navigation (Left = Next, Right = Prev in RTL)
    document.addEventListener('keydown', (e) => {
      if (!dashboard || !dashboard.classList.contains('active') || isContinuousScrollMode) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (document.querySelector('.modal-overlay.active')) return;

      if (e.key === 'ArrowLeft') {
        goToDashboardScreen(currentDashboardScreenIndex + 1, 'forward');
      } else if (e.key === 'ArrowRight') {
        goToDashboardScreen(currentDashboardScreenIndex - 1, 'backward');
      }
    });

    // 7. Mobile Touch Swipe gestures
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (!dashboard || !dashboard.classList.contains('active') || isContinuousScrollMode) return;
      if (document.querySelector('.modal-overlay.active')) return;

      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Swiped left in RTL -> next screen
          goToDashboardScreen(currentDashboardScreenIndex + 1, 'forward');
        } else {
          // Swiped right in RTL -> prev screen
          goToDashboardScreen(currentDashboardScreenIndex - 1, 'backward');
        }
      }
    }, { passive: true });

    // Initial navigation UI sync
    updateDashboardNavigationUI();
  }

  function goToDashboardScreen(newIndex, direction = 'forward') {
    if (newIndex < 0 || newIndex >= DASHBOARD_SCREENS.length) return;
    if (isScreenTransitioning) return;

    const oldScreenId = DASHBOARD_SCREENS[currentDashboardScreenIndex].id;
    const newScreenId = DASHBOARD_SCREENS[newIndex].id;

    if (isContinuousScrollMode) {
      currentDashboardScreenIndex = newIndex;
      const el = document.getElementById(newScreenId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      updateDashboardNavigationUI();
      return;
    }

    if (oldScreenId === newScreenId) return;

    isScreenTransitioning = true;
    const oldEl = document.getElementById(oldScreenId);
    const newEl = document.getElementById(newScreenId);

    const outClass = direction === 'forward' ? 'anim-slide-out-left' : 'anim-slide-out-right';
    const inClass = direction === 'forward' ? 'anim-slide-in-right' : 'anim-slide-in-left';

    if (oldEl) {
      oldEl.classList.add(outClass);
    }

    setTimeout(() => {
      if (oldEl) {
        oldEl.classList.remove('active-screen', outClass);
      }
      if (newEl) {
        newEl.classList.add('active-screen', inClass);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      currentDashboardScreenIndex = newIndex;
      updateDashboardNavigationUI();

      if (newIndex === DASHBOARD_SCREENS.length - 1) {
        triggerConfettiBurst({ particleCount: 90, spread: 100 });
      }

      setTimeout(() => {
        if (newEl) newEl.classList.remove(inClass);
        isScreenTransitioning = false;
      }, 420);
    }, 280);
  }

  function updateDashboardNavigationUI() {
    const currentInfo = DASHBOARD_SCREENS[currentDashboardScreenIndex];
    if (!currentInfo) return;

    // 1. Update Step number & title in header
    setTxt('screen-step-number', `${currentDashboardScreenIndex + 1} / ${DASHBOARD_SCREENS.length}`);
    setTxt('screen-step-title', currentInfo.title);

    // 2. Update Progress Bar fill width
    const pct = Math.round(((currentDashboardScreenIndex + 1) / DASHBOARD_SCREENS.length) * 100);
    const progressFill = document.getElementById('top-progress-fill');
    if (progressFill) progressFill.style.width = `${pct}%`;

    // 3. Update Quick Nav active pill
    document.querySelectorAll('#screen-pills-nav .quick-pill').forEach((pill, idx) => {
      pill.classList.toggle('active', idx === currentDashboardScreenIndex);
    });

    // 4. Update Floating Dock active button
    document.querySelectorAll('#floating-dock .dock-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === currentDashboardScreenIndex);
    });

    // 5. Update Dots inside each screen
    document.querySelectorAll('.screen-step-dots').forEach(dotsContainer => {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentDashboardScreenIndex);
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 7. LIVE SIBLING JOURNEY COUNTER (العداد الحي)
  // ----------------------------------------------------------------------------
  function setupLiveCounter() {
    const startStr = CONFIG.relationshipStartDate || "2006-08-15";
    const startDate = new Date(startStr);

    function updateTimer() {
      const now = new Date();
      let diffMs = now - startDate;
      if (diffMs < 0) diffMs = 0;

      const totalSeconds = Math.floor(diffMs / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);

      // Approximate years & remaining days
      const years = Math.floor(totalDays / 365.25);
      const days = Math.floor(totalDays % 365.25);

      setTxt('count-years', years);
      setTxt('count-days', days);
      setTxt('count-hours', String(hours).padStart(2, '0'));
      setTxt('count-minutes', String(minutes).padStart(2, '0'));
      setTxt('count-seconds', String(seconds).padStart(2, '0'));
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    // Cheer Confetti Button
    const btnCheer = document.getElementById('btn-cheer');
    if (btnCheer) {
      btnCheer.addEventListener('click', () => {
        triggerConfettiBurst({ particleCount: 80, spread: 100 });
        showToast("🎊 كل سنة وإنتي طيبة وسعيدة يا أحلى أخت في الدنيا! 💛");
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 8. STORY TIMELINE RENDERING (محطات قصتنا)
  // ----------------------------------------------------------------------------
  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const list = CONFIG.timeline && CONFIG.timeline.length ? CONFIG.timeline : [
      {
        date: "البداية",
        title: "يوم ما نورتي الدنيا 👶",
        description: "اليوم اللي جيتي فيه وبدأ معاه أحلى إزعاج وأجمل وجود في بيتنا!",
        tag: "أيام الطفولة"
      },
      {
        date: "سنوات الشقاوة",
        title: "حرب الريموت والأكل 📺🍕",
        description: "آلاف المفاوضات على التلفزيون، وإخفاء الشوكولاتة والأكل عن بعض، والضحك بعد كل خناقة.",
        tag: "ذكريات مضحكة"
      },
      {
        date: "اليوم ودائماً",
        title: `عيد ميلادك يا ${CONFIG.recipientName}! 🎂🎉`,
        description: "سنة جديدة بتكبري فيها، وتفضلي دايماً أحلى وأطيب أخت وسند. يارب سنينك الجاية كلها فرح!",
        tag: "احتفال خاص"
      }
    ];

    container.innerHTML = list.map((item, index) => `
      <div class="timeline-item" data-index="${index}">
        <div class="timeline-node"></div>
        <div class="timeline-content-card">
          <div class="timeline-meta">
            <span class="timeline-date">${escapeHTML(item.date)}</span>
            ${item.tag ? `<span class="badge-pill">${escapeHTML(item.tag)}</span>` : ''}
          </div>
          <h3 class="timeline-title">${escapeHTML(item.title)}</h3>
          <p class="timeline-desc">${escapeHTML(item.description)}</p>
          ${item.image ? `
          <div class="timeline-img-wrap">
            <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy" onerror="this.style.display='none'">
          </div>` : ''}
        </div>
      </div>
    `).join('');
  }

  // ----------------------------------------------------------------------------
  // 9. AUDIO PLAYER & SYNTHESIZER FALLBACK (المشغل الموسيقي)
  // ----------------------------------------------------------------------------
  function setupAudioPlayer() {
    const audio = document.getElementById('main-audio-element');
    const btnPlay = document.getElementById('btn-audio-play');
    const playIcon = document.getElementById('audio-play-icon');
    const disc = document.getElementById('vinyl-disc');
    const needleWrap = document.querySelector('.music-player-card');
    const progressBar = document.getElementById('progress-bar-wrap');
    const progressFill = document.getElementById('progress-bar-fill');
    const currTimeLabel = document.getElementById('current-time');
    const totalTimeLabel = document.getElementById('total-duration');
    const volumeSlider = document.getElementById('volume-slider');
    const btnRewind = document.getElementById('btn-audio-rewind');
    const btnForward = document.getElementById('btn-audio-forward');
    const btnMiniAudio = document.getElementById('btn-mini-audio');

    function updatePlayState(playing) {
      isAudioPlaying = playing;
      if (playing) {
        if (playIcon) playIcon.className = 'fa-solid fa-pause';
        if (disc) disc.classList.add('playing');
        if (needleWrap) needleWrap.classList.add('is-playing');
        if (btnMiniAudio) btnMiniAudio.classList.add('playing');
      } else {
        if (playIcon) playIcon.className = 'fa-solid fa-play';
        if (disc) disc.classList.remove('playing');
        if (needleWrap) needleWrap.classList.remove('is-playing');
        if (btnMiniAudio) btnMiniAudio.classList.remove('playing');
      }
    }

    function toggleAudio() {
      if (!audio) return;
      if (isAudioPlaying) {
        audio.pause();
        stopSynthMelody();
        updatePlayState(false);
      } else {
        tryPlayAudio();
      }
    }

    if (btnPlay) btnPlay.addEventListener('click', toggleAudio);
    if (btnMiniAudio) btnMiniAudio.addEventListener('click', toggleAudio);

    if (btnRewind && audio) {
      btnRewind.addEventListener('click', () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
      });
    }

    if (btnForward && audio) {
      btnForward.addEventListener('click', () => {
        audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
      });
    }

    if (volumeSlider && audio) {
      volumeSlider.addEventListener('input', (e) => {
        audio.volume = parseFloat(e.target.value);
      });
    }

    if (progressBar && audio) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        // Support RTL seek
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        if (audio.duration) {
          audio.currentTime = (clickX / width) * audio.duration;
        }
      });
    }

    if (audio) {
      audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (currTimeLabel) currTimeLabel.textContent = formatTime(audio.currentTime);
      });

      audio.addEventListener('loadedmetadata', () => {
        if (totalTimeLabel) totalTimeLabel.textContent = formatTime(audio.duration);
      });

      audio.addEventListener('ended', () => {
        updatePlayState(false);
      });
    }
  }

  function tryPlayAudio() {
    const audio = document.getElementById('main-audio-element');
    const playIcon = document.getElementById('audio-play-icon');
    const disc = document.getElementById('vinyl-disc');
    const needleWrap = document.querySelector('.music-player-card');
    const btnMiniAudio = document.getElementById('btn-mini-audio');

    if (audio && audio.currentSrc) {
      audio.play().then(() => {
        isAudioPlaying = true;
        if (playIcon) playIcon.className = 'fa-solid fa-pause';
        if (disc) disc.classList.add('playing');
        if (needleWrap) needleWrap.classList.add('is-playing');
        if (btnMiniAudio) btnMiniAudio.classList.add('playing');
      }).catch((err) => {
        console.info("Autoplay restricted or audio missing. Starting synth audio:", err);
        startSynthMelody();
        isAudioPlaying = true;
        if (playIcon) playIcon.className = 'fa-solid fa-pause';
        if (disc) disc.classList.add('playing');
        if (needleWrap) needleWrap.classList.add('is-playing');
        if (btnMiniAudio) btnMiniAudio.classList.add('playing');
        showToast("🎵 جاري تشغيل نغمة هادئة (تقدري تحطي أغنيتك في ملف our-song.mp3)");
      });
    } else {
      startSynthMelody();
      isAudioPlaying = true;
      if (playIcon) playIcon.className = 'fa-solid fa-pause';
      if (disc) disc.classList.add('playing');
      if (needleWrap) needleWrap.classList.add('is-playing');
      if (btnMiniAudio) btnMiniAudio.classList.add('playing');
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Ambient chime Web Audio API fallback
  function startSynthMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!synthAudioCtx) synthAudioCtx = new AudioContext();
      if (synthAudioCtx.state === 'suspended') synthAudioCtx.resume();

      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00];
      let step = 0;

      if (synthInterval) clearInterval(synthInterval);
      synthInterval = setInterval(() => {
        if (!isAudioPlaying || !synthAudioCtx) return;
        playSynthNote(notes[step % notes.length]);
        step++;
      }, 1200);
    } catch (e) {
      console.warn("Synth audio error", e);
    }
  }

  function playSynthNote(freq) {
    if (!synthAudioCtx) return;
    const osc = synthAudioCtx.createOscillator();
    const gain = synthAudioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, synthAudioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, synthAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, synthAudioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, synthAudioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(synthAudioCtx.destination);
    osc.start();
    osc.stop(synthAudioCtx.currentTime + 1.2);
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function playPaperChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (_) {}
  }

  function playSuccessChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
      });
    } catch (_) {}
  }

  // ----------------------------------------------------------------------------
  // 10. PHOTO MOMENTS & SIBLING NOTES (لقطات وذكريات خاصة)
  // ----------------------------------------------------------------------------
  function setupPhotoMoments() {
    const grid = document.getElementById('moments-grid');
    if (!grid) return;

    const moments = CONFIG.photoMoments && CONFIG.photoMoments.length ? CONFIG.photoMoments : [
      {
        id: 1,
        image: "assets/images/memory1.jpg",
        title: "ذكريات وضحك الطفولة 🚲",
        date: "أيام زمان",
        tag: "أيام لا تُنسى",
        note: "فاكرة اليوم ده؟ كنا بنضحك بالساعات على أبسط وأتفه حاجة.. ضحكتك دايماً بتنور وتفرح البيت كله.",
        reactionCount: 24
      },
      {
        id: 2,
        image: "assets/images/memory2.jpg",
        title: "سند وضهر لبعض دايماً 🤜🤛",
        date: "عشرة عمر",
        tag: "شركاء العمر",
        note: "مهما اختلفنا أو اتخانقنا على حاجات صغيرة، عارف ومطمن إنك دايماً في ضهري وأنا دايماً في ضهرك وسندك.",
        reactionCount: 52
      },
      {
        id: 3,
        image: "assets/images/memory3.jpg",
        title: "كل سنة وإنتي طيبة وبخير! 🎂✨",
        date: "يومك المميز",
        tag: "عيد ميلاد سعيد",
        note: "اليوم ده معمول مخصوص عشان نحتفل بيكي وبكل حاجة حلوة بتضيفيها لحياتنا. كل سنة وإنتي الأقرب لقلبي.",
        reactionCount: 99
      }
    ];

    grid.innerHTML = moments.map((m) => `
      <div class="moment-card" data-id="${m.id}">
        <div class="moment-photo-wrap" onclick="window.openLightbox('${escapeHTML(m.image)}', '${escapeHTML(m.title)}', '${escapeHTML(m.note)}')">
          <div class="moment-photo-bg" style="background-image: url('${escapeHTML(m.image)}')"></div>
          <img src="${escapeHTML(m.image)}" alt="${escapeHTML(m.title)}" loading="lazy" onerror="this.src='assets/images/memory1.jpg'">
          <div class="moment-photo-overlay">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </div>
          <span class="moment-badge-tag">${escapeHTML(m.tag || 'ذكرى خاصة')}</span>
        </div>
        <div class="moment-content">
          <div>
            <div class="moment-header">
              <h3 class="moment-title">${escapeHTML(m.title)}</h3>
              <span class="moment-date">${escapeHTML(m.date || '')}</span>
            </div>
            <div class="moment-note-box">
              <p class="moment-note-text">"${escapeHTML(m.note)}"</p>
            </div>
          </div>
          <div class="moment-actions">
            <button class="btn-reaction" onclick="window.incrementReaction(this)">
              <i class="fa-solid fa-star"></i>
              <span>حبيت اللحظة دي</span>
              <span class="reaction-count">${m.reactionCount || 1}</span>
            </button>
            <span class="badge-pill">${CONFIG.relationshipBadge || 'أخوة وسند'}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Global reaction incrementer
  window.incrementReaction = function (btn) {
    const countEl = btn.querySelector('.reaction-count');
    if (!countEl) return;
    let count = parseInt(countEl.textContent, 10) || 0;
    count++;
    countEl.textContent = count;
    btn.style.transform = 'scale(1.2)';
    setTimeout(() => btn.style.transform = '', 200);
    triggerConfettiBurst({ particleCount: 15, spread: 45 });
    showToast("💛 تم إرسال محبة أخوية +1!");
  };

  // ----------------------------------------------------------------------------
  // 11. THE HIDDEN GIFT BOX & VOUCHERS (الهدية المخفية والكوبونات)
  // ----------------------------------------------------------------------------
  function setupHiddenGift() {
    const trigger = document.getElementById('gift-trigger');
    const modal = document.getElementById('gift-modal');
    const btnClose = document.getElementById('btn-close-gift-modal');
    const btnClaim = document.getElementById('btn-claim-vouchers');

    function openGift() {
      if (modal) modal.classList.add('active');
      triggerConfettiBurst({ particleCount: 120, spread: 100 });
      playSuccessChime();
    }

    function closeGift() {
      if (modal) modal.classList.remove('active');
    }

    if (trigger) {
      trigger.addEventListener('click', openGift);
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGift();
        }
      });
    }

    if (btnClose) btnClose.addEventListener('click', closeGift);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGift();
      });
    }

    if (btnClaim) {
      btnClaim.addEventListener('click', () => {
        triggerConfettiBurst({ particleCount: 100, spread: 90 });
        showToast("🎟️ تم استلام كل الكوبونات الذهبية بنجاح! مبروك عليكي الدلع 🎁");
        closeGift();
      });
    }
  }

  function renderVouchers() {
    const grid = document.getElementById('vouchers-grid');
    if (!grid || !CONFIG.hiddenGift) return;

    const vouchers = CONFIG.hiddenGift.vouchers && CONFIG.hiddenGift.vouchers.length
      ? CONFIG.hiddenGift.vouchers
      : [
        {
          badge: "كوبون رقم 1 🍔",
          title: "1x وجبة أو حلى على حسابي",
          desc: "صالح للاستخدام في أي وقت تطلبي فيه أكلتك أو حلوياتك المفضلة بدون أي نقاش أو اعتراض!"
        },
        {
          badge: "كوبون رقم 2 🏆",
          title: "1x كارت الفوز بأي خناقة",
          desc: "استخدمي الكارت ده في أي نقاش أو خناقة بيننا عشان تكسبي فوراً وأعترف رسمياً إنك صح!"
        },
        {
          badge: "كوبون رقم 3 🧹",
          title: "1x كارت خدمة أو مشوار بدون تذمر",
          desc: "سلمي الكارت ده وهعملك أي طلب أو مشوار أو خدمة تطلبيها بابتسامه وبدون أي تذمر."
        }
      ];

    grid.innerHTML = vouchers.map((v) => `
      <div class="voucher-card">
        <span class="voucher-badge">${escapeHTML(v.badge || 'كارت ذهبي')}</span>
        <h4 class="voucher-title">${escapeHTML(v.title)}</h4>
        <p class="voucher-desc">${escapeHTML(v.desc)}</p>
      </div>
    `).join('');
  }

  // ----------------------------------------------------------------------------
  // 12. MEMORIES GALLERY & LIGHTBOX (معرض الذكريات)
  // ----------------------------------------------------------------------------
  function setupGallery() {
    const grid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-pill');

    allGalleryItems = CONFIG.gallery && CONFIG.gallery.length ? CONFIG.gallery : [
      {
        id: 1,
        image: "assets/images/memory1.jpg",
        category: "childhood",
        caption: "أيام الشقاوة والضحك العفوي من القلب 🚲"
      },
      {
        id: 2,
        image: "assets/images/memory2.jpg",
        category: "bonding",
        caption: "الفريق والسند اللي مفيش زيه في الدنيا 🤜🤛"
      },
      {
        id: 3,
        image: "assets/images/memory3.jpg",
        category: "birthday",
        caption: `عقبال 100 سنة سعادة ونجاح وتألق دايماً 🎂`
      }
    ];

    function renderItems(filterCategory) {
      if (!grid) return;
      const filtered = filterCategory === 'all'
        ? allGalleryItems
        : allGalleryItems.filter(item => (item.category || '').toLowerCase() === filterCategory.toLowerCase());

      grid.innerHTML = filtered.map((item, index) => `
        <div class="gallery-item" data-idx="${index}" onclick="window.openLightboxGallery(${index})">
          <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.caption)}" loading="lazy" onerror="this.src='assets/images/memory1.jpg'">
          <div class="gallery-overlay">
            <span class="gallery-caption">${escapeHTML(item.caption)}</span>
          </div>
        </div>
      `).join('');
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';
        renderItems(filter);
      });
    });

    renderItems('all');
    setupLightboxModal();
  }

  function setupLightboxModal() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('btn-close-lightbox');
    const prevBtn = document.getElementById('btn-lightbox-prev');
    const nextBtn = document.getElementById('btn-lightbox-next');

    function closeLightbox() {
      if (modal) modal.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (!allGalleryItems.length) return;
        currentLightboxIndex = (currentLightboxIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
        loadLightboxItem(allGalleryItems[currentLightboxIndex]);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (!allGalleryItems.length) return;
        currentLightboxIndex = (currentLightboxIndex + 1) % allGalleryItems.length;
        loadLightboxItem(allGalleryItems[currentLightboxIndex]);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowLeft' && nextBtn) nextBtn.click();
    });
  }

  function loadLightboxItem(item) {
    if (!item) return;
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const caption = document.getElementById('lightbox-caption');
    if (img) img.src = item.image;
    if (title) title.textContent = item.title || "صورة من الذكريات";
    if (caption) caption.textContent = item.caption || item.note || "";
  }

  window.openLightboxGallery = function (index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;
    loadLightboxItem(allGalleryItems[index]);
    modal.classList.add('active');
  };

  window.openLightbox = function (image, title, caption) {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const capEl = document.getElementById('lightbox-caption');
    if (imgEl) imgEl.src = image;
    if (titleEl) titleEl.textContent = title;
    if (capEl) capEl.textContent = caption;
    modal.classList.add('active');
  };

  // ----------------------------------------------------------------------------
  // 13. THEME TOGGLING (الوضع الليلي والنهاري)
  // ----------------------------------------------------------------------------
  function initTheme() {
    const saved = localStorage.getItem('mk_gift_theme');
    const btn = document.getElementById('btn-theme-toggle');
    const icon = document.getElementById('theme-icon');

    if (saved === 'dark') {
      document.body.classList.add('theme-dark');
      if (icon) icon.className = 'fa-solid fa-sun';
    }

    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('theme-dark');
        localStorage.setItem('mk_gift_theme', isDark ? 'dark' : 'warm');
        if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 14. NAVIGATION & BACK TO TOP
  // ----------------------------------------------------------------------------
  function setupNavigation() {
    const btnBackTop = document.getElementById('btn-back-top');
    if (btnBackTop) {
      btnBackTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 15. PURE JS CANVAS CONFETTI ENGINE (محرك الاحتفال والكونفيتي)
  // ----------------------------------------------------------------------------
  let confettiParticles = [];
  let confettiAnimationId = null;

  function setupConfettiCanvas() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();
  }

  function triggerConfettiBurst(opts = {}) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const count = opts.particleCount || 60;
    const colors = ['#F59E0B', '#4F46E5', '#0D9488', '#E06D53', '#8B5CF6', '#FBBF24', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * (opts.spread || 90) - (opts.spread || 90) / 2) * (Math.PI / 180);
      const velocity = 8 + Math.random() * 12;

      confettiParticles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: Math.sin(angle) * velocity + (Math.random() - 0.5) * 6,
        vy: -Math.cos(angle) * velocity - Math.random() * 4,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        life: 0.98 + Math.random() * 0.015
      });
    }

    if (!confettiAnimationId) {
      runConfettiLoop();
    }
  }

  function runConfettiLoop() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity *= p.life;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();

      if (p.opacity < 0.02 || p.y > canvas.height + 20) {
        confettiParticles.splice(i, 1);
      }
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(runConfettiLoop);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiAnimationId = null;
    }
  }

  // ----------------------------------------------------------------------------
  // 16. TOAST NOTIFICATION UTILITY
  // ----------------------------------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
