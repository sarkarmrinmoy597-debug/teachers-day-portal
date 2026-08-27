/**
 * Teachers' Day Special Campus Portal (Guru-Utsav 2026)
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Target Date for Teachers' Day: September 5, 2026 09:00 AM IST
  const targetEventDate = new Date('September 5, 2026 09:00:00 GMT+0530').getTime();

  // ==========================================
  // 1. STATE & LOCALSTORAGE PERSISTENCE
  // ==========================================
  const STORAGE_KEY_PASSES = 'guru_utsav_passes_v1';
  const STORAGE_KEY_ACTS = 'guru_utsav_acts_v1';
  const STORAGE_KEY_DEDS = 'guru_utsav_deds_v1';
  const STORAGE_KEY_VOTES = 'guru_utsav_votes_v1';

  // Seed Data for Instant Vibrancy
  const defaultPasses = [
    {
      ticketId: 'PASS #TD26-0001',
      name: 'Aarav Sharma',
      roll: '23CS042',
      dept: 'Computer Science & Engg',
      year: '3rd Year',
      phone: '9876543210',
      email: 'aarav.sharma@campus.edu',
      paymentApp: 'Google Pay',
      utr: '423871982341',
      status: 'Verified',
      amount: 100,
      timestamp: Date.now() - 3600000 * 24
    },
    {
      ticketId: 'PASS #TD26-0002',
      name: 'Sneha Roy',
      roll: '24IT018',
      dept: 'Information Technology',
      year: '2nd Year',
      phone: '9812345678',
      email: 'sneha.roy@campus.edu',
      paymentApp: 'PhonePe',
      utr: '423984120938',
      status: 'Verified',
      amount: 100,
      timestamp: Date.now() - 3600000 * 18
    },
    {
      ticketId: 'PASS #TD26-0003',
      name: 'Rohan Verma',
      roll: '22ME089',
      dept: 'Mechanical Engineering',
      year: '4th Year',
      phone: '9765432190',
      email: 'rohan.v@campus.edu',
      paymentApp: 'Paytm UPI',
      utr: '423512984712',
      status: 'Verified',
      amount: 100,
      timestamp: Date.now() - 3600000 * 12
    },
    {
      ticketId: 'PASS #TD26-0004',
      name: 'Ananya Deshmukh',
      roll: '23EC015',
      dept: 'Electronics & Comm. (ECE)',
      year: '3rd Year',
      phone: '9833445566',
      email: 'ananya.d@campus.edu',
      paymentApp: 'Google Pay',
      utr: '424109823412',
      status: 'Verified',
      amount: 100,
      timestamp: Date.now() - 3600000 * 8
    },
    {
      ticketId: 'PASS #TD26-0005',
      name: 'Kabir Mehta',
      roll: '25BA054',
      dept: 'Business Administration (MBA/BBA)',
      year: '1st Year',
      phone: '9988776655',
      email: 'kabir.m@campus.edu',
      paymentApp: 'BHIM UPI',
      utr: '424219803211',
      status: 'Verified',
      amount: 100,
      timestamp: Date.now() - 3600000 * 4
    }
  ];

  const defaultActs = [
    {
      id: 'act-1',
      title: 'Ode to Mentors (Acoustic Guitar & Medley)',
      category: 'Singing (Solo/Duet)',
      duration: '5-7 Minutes',
      lead: 'Sneha Roy & Rohan Verma',
      passId: 'PASS #TD26-0002',
      members: 'Sneha (Vocals), Rohan (Acoustic Guitar), Aditya (Cajon)',
      reqs: '2 Wireless Mics, 1 Guitar Direct Line',
      status: 'Confirmed Slot #1'
    },
    {
      id: 'act-2',
      title: 'Guru Brahma - Classical Kathak & Contemporary Fusion',
      category: 'Classical / Fusion Dance',
      duration: '5-7 Minutes',
      lead: 'Ananya Deshmukh',
      passId: 'PASS #TD26-0004',
      members: 'Ananya D., Priya K., Meera S., Pooja R.',
      reqs: 'Bluetooth Track playback, warm stage lighting',
      status: 'Confirmed Slot #2'
    },
    {
      id: 'act-3',
      title: 'Classroom Chronicles: The Last Bench Legends (Skit)',
      category: 'Drama / Theatrical Skit',
      duration: '8-12 Minutes',
      lead: 'Kabir Mehta',
      passId: 'PASS #TD26-0005',
      members: 'Drama Club Ensemble (7 members)',
      reqs: '4 Collar mics, 4 chairs, blackboard prop',
      status: 'Confirmed Slot #3'
    },
    {
      id: 'act-4',
      title: 'A Tribute in Verse - Urdu & Hindi Shayari for Teachers',
      category: 'Poetry / Shayari / Speech',
      duration: '3-5 Minutes',
      lead: 'Aarav Sharma',
      passId: 'PASS #TD26-0001',
      members: 'Solo Performance',
      reqs: 'Podium & 1 Gooseneck Mic',
      status: 'Confirmed Slot #4'
    },
    {
      id: 'act-5',
      title: 'Professors vs Students: The Ultimate Campus Trivia Showdown',
      category: 'Teacher-Student Quiz / Game',
      duration: '15+ Minutes',
      lead: 'Student Council Core',
      passId: 'PASS #TD26-0001',
      members: '4 Faculty Captains + 4 Student Captains',
      reqs: 'Buzzer system & Projector screen',
      status: 'Confirmed Slot #5'
    }
  ];

  const defaultDedications = [
    {
      id: 'ded-1',
      author: 'Sneha Roy (IT, 2nd Yr)',
      teacher: 'Prof. Rajesh Sharma',
      gift: '⭐ Best Mentor Star',
      message: 'Thank you Sir for making Data Structures feel like solving fun puzzles rather than dry code! Your patience during doubt sessions made all the difference.',
      theme: 'amber',
      likes: 28,
      timestamp: Date.now() - 3600000 * 20
    },
    {
      id: 'ded-2',
      author: 'Aarav Sharma (CS, 3rd Yr)',
      teacher: 'Dr. Meenakshi Sundaram',
      gift: '💐 Bouquet of Roses',
      message: 'Ma’am, your encouraging words during our project presentation inspired our entire team to publish our first research paper. You are truly our guiding light!',
      theme: 'pink',
      likes: 42,
      timestamp: Date.now() - 3600000 * 16
    },
    {
      id: 'ded-3',
      author: 'Rohan & Mechanical Batch',
      teacher: 'Prof. Anand Joshi',
      gift: '🏆 Golden Trophy Award',
      message: 'Happy Teachers’ Day to the most energetic professor in campus! Thermodynamics was never boring because of your real-world engine stories.',
      theme: 'emerald',
      likes: 35,
      timestamp: Date.now() - 3600000 * 10
    },
    {
      id: 'ded-4',
      author: 'Priya & Kavita (ECE)',
      teacher: 'Dr. Sunita Sen',
      gift: '🍫 Sweet Chocolate Box',
      message: 'Thank you for believing in us when our circuits were frying up in the VLSI lab. You taught us that failure is just the first step in learning.',
      theme: 'purple',
      likes: 19,
      timestamp: Date.now() - 3600000 * 5
    }
  ];

  const defaultFaculty = [
    {
      name: 'Dr. Meenakshi Sundaram',
      dept: 'Computer Science & AI',
      role: 'Head of Department',
      tag: '💡 Innovation Guru',
      quote: '"Code with precision, think with empathy."',
      avatar: 'MS',
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Prof. Rajesh Sharma',
      dept: 'Information Technology',
      role: 'Associate Professor',
      tag: '🔥 Classroom Energizer',
      quote: '"Every bug is an invitation to understand your system deeper."',
      avatar: 'RS',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Dr. Sunita Sen',
      dept: 'Electronics & Comm.',
      role: 'Professor & Dean',
      tag: '🌟 Most Inspiring Mentor',
      quote: '"Small daily discoveries build tomorrow’s engineering breakthroughs."',
      avatar: 'SS',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Prof. Anand Joshi',
      dept: 'Mechanical Engineering',
      role: 'Senior Faculty',
      tag: '⚙️ The Coolest Professor',
      quote: '"Thermodynamics rules the universe, but passion drives the engineer."',
      avatar: 'AJ',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const defaultVotes = {
    'Most Inspiring Mentor': {
      'Dr. Sunita Sen': 142,
      'Dr. Meenakshi Sundaram': 136,
      'Prof. Rajesh Sharma': 98
    },
    'The Coolest Professor': {
      'Prof. Anand Joshi': 158,
      'Prof. Rajesh Sharma': 122,
      'Prof. Vikram Malhotra': 84
    },
    'Master of Explanations': {
      'Dr. Meenakshi Sundaram': 165,
      'Dr. Sunita Sen': 118,
      'Prof. Anand Joshi': 94
    }
  };

  // Load state from LocalStorage or Defaults
  let passes = JSON.parse(localStorage.getItem(STORAGE_KEY_PASSES)) || defaultPasses;
  let acts = JSON.parse(localStorage.getItem(STORAGE_KEY_ACTS)) || defaultActs;
  let dedications = JSON.parse(localStorage.getItem(STORAGE_KEY_DEDS)) || defaultDedications;
  let votes = JSON.parse(localStorage.getItem(STORAGE_KEY_VOTES)) || defaultVotes;

  function saveState() {
    localStorage.setItem(STORAGE_KEY_PASSES, JSON.stringify(passes));
    localStorage.setItem(STORAGE_KEY_ACTS, JSON.stringify(acts));
    localStorage.setItem(STORAGE_KEY_DEDS, JSON.stringify(dedications));
    localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(votes));
    updateMetricsRibbon();
  }

  // ==========================================
  // 2. LIVE COUNTDOWN CLOCK ENGINE
  // ==========================================
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetEventDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Calendar & Share buttons
  document.getElementById('add-calendar-btn')?.addEventListener('click', () => {
    const title = encodeURIComponent("Guru-Utsav 2026: Campus Teachers' Day Gala");
    const details = encodeURIComponent("Grand Teachers' Day celebration with cultural performances, ₹100 contribution gala, faculty honors, and banquet lunch.");
    const location = encodeURIComponent("Main University Auditorium & Campus Foyer");
    const dates = "20260905T033000Z/20260905T120000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  });

  document.getElementById('share-event-btn')?.addEventListener('click', async () => {
    const shareData = {
      title: "Guru-Utsav 2026 | Teachers' Day Campus Celebration",
      text: "Join us for the grand Teachers' Day Gala on Sept 5th! Get your ₹100 entry pass, sign up for stage acts, and dedicate messages to our teachers.",
      url: window.location.href
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Campus Portal link copied to clipboard! Share it with your classmates on WhatsApp.');
    }
  });

  document.getElementById('trigger-confetti-btn')?.addEventListener('click', () => {
    triggerCelebrationConfetti();
    playChime();
  });

  // ==========================================
  // 3. UPI QR CODE GENERATION
  // ==========================================
  const upiQrContainer = document.getElementById('upi-qrcode-container');
  if (upiQrContainer && window.QRCode) {
    const upiUri = 'upi://pay?pa=campus.teachersday@upi&pn=Teachers%20Day%20Celebration&am=100&cu=INR&tn=TeachersDayPass';
    upiQrContainer.innerHTML = '';
    new QRCode(upiQrContainer, {
      text: upiUri,
      width: 140,
      height: 140,
      colorDark: '#020617',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  // ==========================================
  // 4. ₹100 PASS REGISTRATION & DIGITAL BADGE
  // ==========================================
  const donationForm = document.getElementById('donation-form');
  const passModal = document.getElementById('pass-modal');
  const closePassModalBtn = document.getElementById('close-pass-modal');
  const badgeQrcodeContainer = document.getElementById('badge-qrcode');

  let currentGeneratedPass = null;

  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const roll = document.getElementById('reg-roll').value.trim().toUpperCase();
      const dept = document.getElementById('reg-dept').value;
      const year = document.getElementById('reg-year').value;
      const phone = document.getElementById('reg-phone').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const paymentApp = document.getElementById('reg-payment-app').value;
      const utr = document.getElementById('reg-utr').value.trim();
      const wantsPerform = document.getElementById('reg-wants-perform').checked;

      // Generate unique ticket ID
      const passNum = String(passes.length + 1).padStart(4, '0');
      const ticketId = `PASS #TD26-${passNum}`;

      const newPass = {
        ticketId,
        name,
        roll,
        dept,
        year,
        phone,
        email,
        paymentApp,
        utr,
        status: 'Verified',
        amount: 100,
        timestamp: Date.now()
      };

      passes.unshift(newPass);
      saveState();
      renderAdminPasses();

      // Render Modal Ticket Card
      renderTicketBadge(newPass);

      // Pre-fill Performance Pass ID if checked
      if (wantsPerform) {
        const perfLeadInput = document.getElementById('perf-lead');
        const perfPassInput = document.getElementById('perf-pass-id');
        if (perfLeadInput) perfLeadInput.value = name;
        if (perfPassInput) perfPassInput.value = ticketId;
      }

      // Show modal & celebrate
      passModal.classList.remove('hidden');
      triggerCelebrationConfetti();
      playChime();

      // Reset form
      donationForm.reset();
    });
  }

  function renderTicketBadge(passData) {
    currentGeneratedPass = passData;
    document.getElementById('badge-ticket-id').innerText = passData.ticketId;
    document.getElementById('badge-name').innerText = passData.name;
    document.getElementById('badge-roll').innerText = `Roll: ${passData.roll}`;
    document.getElementById('badge-dept').innerText = `${passData.dept} • ${passData.year}`;
    document.getElementById('badge-utr').innerText = `UTR: ${passData.utr}`;

    // Avatar initials
    const initials = passData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById('badge-avatar').innerText = initials || 'TD';

    // QR Verification Data
    if (badgeQrcodeContainer && window.QRCode) {
      badgeQrcodeContainer.innerHTML = '';
      const verifyData = `https://campus.edu/verify?pass=${encodeURIComponent(passData.ticketId)}&roll=${encodeURIComponent(passData.roll)}&status=AUTHENTICATED`;
      new QRCode(badgeQrcodeContainer, {
        text: verifyData,
        width: 64,
        height: 64,
        colorDark: '#020617',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }

  if (closePassModalBtn) {
    closePassModalBtn.addEventListener('click', () => {
      passModal.classList.add('hidden');
    });
  }

  document.getElementById('modal-to-activities')?.addEventListener('click', () => {
    passModal.classList.add('hidden');
  });

  // Download pass as PNG using html2canvas
  document.getElementById('download-pass-btn')?.addEventListener('click', () => {
    const card = document.getElementById('ticket-badge-card');
    if (!card || !window.html2canvas) return;

    html2canvas(card, {
      backgroundColor: '#020617',
      scale: 2
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `${(currentGeneratedPass?.name || 'TeachersDayPass').replace(/\s+/g, '_')}_Pass.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  // Print Pass
  document.getElementById('print-pass-btn')?.addEventListener('click', () => {
    window.print();
  });

  // ==========================================
  // 5. ACTIVITY & PERFORMANCE SIGNUP
  // ==========================================
  const performanceForm = document.getElementById('performance-form');
  const performancesList = document.getElementById('performances-list');
  const actsCounterBadge = document.getElementById('acts-counter-badge');

  function renderPerformances() {
    if (!performancesList) return;
    performancesList.innerHTML = '';

    if (actsCounterBadge) {
      actsCounterBadge.innerText = `${acts.length} Registered Slots`;
    }

    acts.forEach((act, idx) => {
      const actCard = document.createElement('div');
      actCard.className = 'p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-purple-500/40 transition-all text-xs';
      actCard.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <span class="font-bold text-white text-sm">${act.title}</span>
          <span class="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-mono text-[10px] border border-purple-500/20 shrink-0">
            ${act.status || `Slot #${idx + 1}`}
          </span>
        </div>
        <div class="flex items-center gap-3 text-slate-400 mb-2 flex-wrap">
          <span class="text-amber-400 font-semibold flex items-center gap-1">
            <i data-lucide="tag" class="w-3 h-3"></i> ${act.category}
          </span>
          <span>•</span>
          <span class="flex items-center gap-1">
            <i data-lucide="clock" class="w-3 h-3"></i> ${act.duration}
          </span>
        </div>
        <div class="text-slate-300">
          <span class="text-slate-500 font-medium">Lead:</span> ${act.lead} ${act.members ? `<span class="text-slate-500 text-[11px] block mt-0.5 truncate">Team: ${act.members}</span>` : ''}
        </div>
      `;
      performancesList.appendChild(actCard);
    });

    if (window.lucide) lucide.createIcons();
  }

  if (performanceForm) {
    performanceForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('perf-title').value.trim();
      const category = document.getElementById('perf-category').value;
      const duration = document.getElementById('perf-duration').value;
      const lead = document.getElementById('perf-lead').value.trim();
      const passId = document.getElementById('perf-pass-id').value.trim();
      const members = document.getElementById('perf-members').value.trim();
      const reqs = document.getElementById('perf-reqs').value.trim();

      const newAct = {
        id: 'act-' + (acts.length + 1),
        title,
        category,
        duration,
        lead,
        passId,
        members,
        reqs,
        status: `Confirmed Slot #${acts.length + 1}`
      };

      acts.unshift(newAct);
      saveState();
      renderPerformances();
      renderAdminActs();

      triggerCelebrationConfetti();
      playChime();
      alert(`🎉 Bravo! Your act "${title}" has been registered in Slot #${acts.length}! The stage coordinators will reach out on WhatsApp.`);
      performanceForm.reset();
    });
  }

  // ==========================================
  // 6. WALL OF GRATITUDE (TEACHER DEDICATIONS)
  // ==========================================
  const dedicationForm = document.getElementById('dedication-form');
  const gratitudeGrid = document.getElementById('gratitude-grid');
  const wallSearch = document.getElementById('wall-search');
  const filterBtns = document.querySelectorAll('.wall-filter-btn');
  let selectedTheme = 'amber';
  let currentFilter = 'all';

  // Theme selector buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('ring-2', 'ring-white'));
      btn.classList.add('ring-2', 'ring-white');
      selectedTheme = btn.dataset.theme;
    });
  });

  function renderDedications() {
    if (!gratitudeGrid) return;
    gratitudeGrid.innerHTML = '';

    const query = (wallSearch?.value || '').toLowerCase();

    const filtered = dedications.filter(item => {
      const matchesSearch = item.author.toLowerCase().includes(query) ||
                            item.teacher.toLowerCase().includes(query) ||
                            item.message.toLowerCase().includes(query);

      let matchesFilter = true;
      if (currentFilter === 'bouquet') matchesFilter = item.gift.includes('Bouquet') || item.gift.includes('Lotus');
      if (currentFilter === 'star') matchesFilter = item.gift.includes('Star') || item.gift.includes('Coffee');
      if (currentFilter === 'trophy') matchesFilter = item.gift.includes('Trophy') || item.gift.includes('Chocolate');

      return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
      gratitudeGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500 text-sm">
          <i data-lucide="message-square-dashed" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
          No dedications found matching your search. Be the first to write a note!
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between card-theme-${item.theme || 'amber'}`;
      
      const timeAgo = formatTimeAgo(item.timestamp);

      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-950/80 text-amber-300 border border-slate-800 flex items-center gap-1.5">
              ${item.gift}
            </span>
            <span class="text-[10px] text-slate-400 font-mono">${timeAgo}</span>
          </div>
          
          <div class="mb-4">
            <span class="text-xs text-slate-400 block font-medium">To beloved mentor:</span>
            <h4 class="text-base font-bold text-white">${item.teacher}</h4>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
            "${item.message}"
          </p>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div class="text-xs font-semibold text-slate-400">
            From: <span class="text-slate-200">${item.author}</span>
          </div>

          <button class="like-btn flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 hover:bg-pink-500/20 text-xs font-bold text-pink-400 transition-colors border border-slate-800 hover:border-pink-500/30" data-id="${item.id}">
            <i data-lucide="heart" class="w-3.5 h-3.5 fill-pink-500/30"></i>
            <span class="like-count">${item.likes || 0}</span>
          </button>
        </div>
      `;
      gratitudeGrid.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();

    // Attach like listeners
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        const target = dedications.find(d => d.id === id);
        if (target) {
          target.likes = (target.likes || 0) + 1;
          btn.querySelector('.like-count').innerText = target.likes;
          saveState();
          triggerMicroHeart(btn);
        }
      });
    });
  }

  function formatTimeAgo(ts) {
    if (!ts) return 'Recently';
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  function triggerMicroHeart(element) {
    const rect = element.getBoundingClientRect();
    if (window.confetti) {
      confetti({
        particleCount: 12,
        spread: 45,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
        shapes: ['circle']
      });
    }
  }

  if (dedicationForm) {
    dedicationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const author = document.getElementById('ded-author').value.trim();
      const teacher = document.getElementById('ded-teacher').value.trim();
      const gift = document.getElementById('ded-gift').value;
      const message = document.getElementById('ded-message').value.trim();

      const newDed = {
        id: 'ded-' + (dedications.length + 1),
        author,
        teacher,
        gift,
        message,
        theme: selectedTheme,
        likes: 1,
        timestamp: Date.now()
      };

      dedications.unshift(newDed);
      saveState();
      renderDedications();

      triggerCelebrationConfetti();
      playChime();
      alert(`💌 Your beautiful dedication for ${teacher} has been published on the Gratitude Wall!`);
      dedicationForm.reset();
    });
  }

  if (wallSearch) {
    wallSearch.addEventListener('input', renderDedications);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-amber-500', 'text-slate-950');
        b.classList.add('bg-slate-900', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-amber-500', 'text-slate-950');
      btn.classList.remove('bg-slate-900', 'text-slate-300');

      currentFilter = btn.dataset.filter;
      renderDedications();
    });
  });

  // ==========================================
  // 7. FACULTY SPOTLIGHT & LIVE AWARD VOTING
  // ==========================================
  const facultyCardsContainer = document.getElementById('faculty-cards-container');
  const votingPollContainer = document.getElementById('voting-poll-container');

  function renderFacultyProfiles() {
    if (!facultyCardsContainer) return;
    facultyCardsContainer.innerHTML = '';

    defaultFaculty.forEach(fac => {
      const card = document.createElement('div');
      card.className = 'p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between';
      card.innerHTML = `
        <div>
          <div class="flex items-center gap-3.5 mb-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${fac.color} p-0.5 shadow-md shrink-0">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-amber-300 text-sm">
                ${fac.avatar}
              </div>
            </div>
            <div>
              <h4 class="font-bold text-white text-sm">${fac.name}</h4>
              <p class="text-xs text-slate-400">${fac.role}</p>
              <span class="text-[10px] font-semibold text-amber-400">${fac.dept}</span>
            </div>
          </div>
          <p class="text-xs text-slate-300 italic mb-4">${fac.quote}</p>
        </div>
        <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span class="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">${fac.tag}</span>
          <button class="quick-wish-btn text-xs text-amber-400 hover:underline font-semibold" data-name="${fac.name}">
            Send Note &rarr;
          </button>
        </div>
      `;
      facultyCardsContainer.appendChild(card);
    });

    document.querySelectorAll('.quick-wish-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tName = btn.dataset.name;
        const teacherInput = document.getElementById('ded-teacher');
        if (teacherInput) {
          teacherInput.value = tName;
          document.getElementById('gratitude-section')?.scrollIntoView({ behavior: 'smooth' });
          teacherInput.focus();
        }
      });
    });
  }

  function renderVotingPolls() {
    if (!votingPollContainer) return;
    votingPollContainer.innerHTML = '';

    Object.entries(votes).forEach(([category, candidates]) => {
      const totalCatVotes = Object.values(candidates).reduce((a, b) => a + b, 0);

      const catBox = document.createElement('div');
      catBox.className = 'p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3';
      
      let candidateRows = '';
      Object.entries(candidates).forEach(([name, count]) => {
        const percent = totalCatVotes > 0 ? Math.round((count / totalCatVotes) * 100) : 0;
        candidateRows += `
          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-slate-200">${name}</span>
              <div class="flex items-center gap-2">
                <span class="text-slate-400 font-mono">${count} votes</span>
                <span class="text-amber-400 font-bold font-mono text-[11px]">${percent}%</span>
                <button class="vote-action-btn text-[11px] px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold transition-all border border-amber-500/30" data-cat="${category}" data-cand="${name}">
                  Vote
                </button>
              </div>
            </div>
            <div class="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
            </div>
          </div>
        `;
      });

      catBox.innerHTML = `
        <div class="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span class="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
            <i data-lucide="trophy" class="w-3.5 h-3.5 text-amber-400"></i> ${category}
          </span>
          <span class="text-[10px] text-slate-400 font-mono">${totalCatVotes} Total Votes</span>
        </div>
        <div class="space-y-3 pt-1">
          ${candidateRows}
        </div>
      `;

      votingPollContainer.appendChild(catBox);
    });

    if (window.lucide) lucide.createIcons();

    document.querySelectorAll('.vote-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        const cand = btn.dataset.cand;
        if (votes[cat] && votes[cat][cand] !== undefined) {
          votes[cat][cand] += 1;
          saveState();
          renderVotingPolls();
          triggerMicroHeart(btn);
        }
      });
    });
  }

  // ==========================================
  // 8. ORGANIZER / ADMIN DASHBOARD
  // ==========================================
  const adminModal = document.getElementById('admin-modal');
  const adminBtn = document.getElementById('admin-panel-btn');
  const mobileAdminBtn = document.getElementById('mobile-admin-btn');
  const closeAdminBtn = document.getElementById('close-admin-modal');

  const adminTabPasses = document.getElementById('admin-tab-passes');
  const adminTabActs = document.getElementById('admin-tab-acts');
  const adminViewPasses = document.getElementById('admin-view-passes');
  const adminViewActs = document.getElementById('admin-view-acts');
  const adminPassesTbody = document.getElementById('admin-passes-tbody');
  const adminActsTbody = document.getElementById('admin-acts-tbody');

  function openAdminDashboard() {
    updateAdminKPIs();
    renderAdminPasses();
    renderAdminActs();
    adminModal.classList.remove('hidden');
  }

  if (adminBtn) adminBtn.addEventListener('click', openAdminDashboard);
  if (mobileAdminBtn) mobileAdminBtn.addEventListener('click', openAdminDashboard);
  if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => adminModal.classList.add('hidden'));

  adminTabPasses?.addEventListener('click', () => {
    adminTabPasses.classList.add('bg-amber-500', 'text-slate-950');
    adminTabPasses.classList.remove('bg-slate-800', 'text-slate-300');
    adminTabActs.classList.add('bg-slate-800', 'text-slate-300');
    adminTabActs.classList.remove('bg-amber-500', 'text-slate-950');

    adminViewPasses.classList.remove('hidden');
    adminViewActs.classList.add('hidden');
  });

  adminTabActs?.addEventListener('click', () => {
    adminTabActs.classList.add('bg-purple-500', 'text-white');
    adminTabActs.classList.remove('bg-slate-800', 'text-slate-300');
    adminTabPasses.classList.add('bg-slate-800', 'text-slate-300');
    adminTabPasses.classList.remove('bg-amber-500', 'text-slate-950');

    adminViewActs.classList.remove('hidden');
    adminViewPasses.classList.add('hidden');
  });

  function updateAdminKPIs() {
    const totalFunds = passes.reduce((acc, p) => acc + (p.amount || 100), 0);
    document.getElementById('admin-total-funds').innerText = `₹${totalFunds.toLocaleString('en-IN')}`;
    document.getElementById('admin-total-passes').innerText = passes.length;
    document.getElementById('admin-total-acts').innerText = acts.length;
    document.getElementById('admin-total-deds').innerText = dedications.length;

    document.getElementById('admin-count-passes').innerText = passes.length;
    document.getElementById('admin-count-acts').innerText = acts.length;
  }

  function updateMetricsRibbon() {
    const totalFunds = passes.reduce((acc, p) => acc + (p.amount || 100), 0);
    const fundEl = document.getElementById('stat-funds');
    const partEl = document.getElementById('stat-participants');
    const perfEl = document.getElementById('stat-performances');
    const dedEl = document.getElementById('stat-messages');

    if (fundEl) fundEl.innerText = `₹${totalFunds.toLocaleString('en-IN')}`;
    if (partEl) partEl.innerText = `${passes.length}+`;
    if (perfEl) perfEl.innerText = `${acts.length}`;
    if (dedEl) dedEl.innerText = `${dedications.length}+`;
  }

  function renderAdminPasses() {
    if (!adminPassesTbody) return;
    adminPassesTbody.innerHTML = '';

    passes.forEach((pass, index) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/40 transition-colors';
      tr.innerHTML = `
        <td class="p-3 font-mono font-bold text-amber-400">${pass.ticketId}</td>
        <td class="p-3">
          <div class="font-bold text-white">${pass.name}</div>
          <div class="text-[11px] text-slate-400">${pass.phone} • ${pass.email}</div>
        </td>
        <td class="p-3 font-mono">${pass.roll}</td>
        <td class="p-3">
          <div>${pass.dept}</div>
          <div class="text-[11px] text-slate-400">${pass.year}</div>
        </td>
        <td class="p-3">
          <div class="text-emerald-400 font-semibold">₹${pass.amount || 100} (${pass.paymentApp})</div>
          <div class="text-[10px] font-mono text-slate-400">UTR: ${pass.utr}</div>
        </td>
        <td class="p-3">
          <button class="verify-toggle-btn px-2 py-0.5 rounded text-[10px] font-bold border ${pass.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}" data-index="${index}">
            ${pass.status || 'Verified'}
          </button>
        </td>
        <td class="p-3 text-right">
          <button class="view-pass-badge-btn p-1.5 hover:text-amber-400 rounded bg-slate-800 transition-colors" data-index="${index}" title="View Pass">
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      adminPassesTbody.appendChild(tr);
    });

    if (window.lucide) lucide.createIcons();

    // Toggle status listener
    document.querySelectorAll('.verify-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        passes[idx].status = passes[idx].status === 'Verified' ? 'Pending Audit' : 'Verified';
        saveState();
        renderAdminPasses();
      });
    });

    // View Pass badge listener
    document.querySelectorAll('.view-pass-badge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        renderTicketBadge(passes[idx]);
        passModal.classList.remove('hidden');
      });
    });
  }

  function renderAdminActs() {
    if (!adminActsTbody) return;
    adminActsTbody.innerHTML = '';

    acts.forEach((act) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-800/40 transition-colors';
      tr.innerHTML = `
        <td class="p-3 font-bold text-white">${act.title}</td>
        <td class="p-3 font-semibold text-purple-400">${act.category}</td>
        <td class="p-3">
          <div class="text-slate-200 font-medium">${act.lead}</div>
          <div class="text-[10px] text-slate-400 font-mono">${act.passId || 'Pass ID Verified'}</div>
        </td>
        <td class="p-3">${act.duration}</td>
        <td class="p-3 text-slate-400 text-[11px]">${act.reqs || 'Standard Stage Mic'}</td>
        <td class="p-3 font-mono text-emerald-400">${act.status || 'Confirmed Slot'}</td>
      `;
      adminActsTbody.appendChild(tr);
    });

    if (window.lucide) lucide.createIcons();
  }

  // Export CSV
  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    let csv = 'Ticket ID,Name,Roll No,Department,Year,Phone,Email,Payment Mode,UTR / Ref No,Amount,Status\n';
    passes.forEach(p => {
      csv += `"${p.ticketId}","${p.name}","${p.roll}","${p.dept}","${p.year}","${p.phone}","${p.email}","${p.paymentApp}","${p.utr}",${p.amount || 100},"${p.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Guru_Utsav_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  });

  // Reset Demo Data
  document.getElementById('reset-demo-btn')?.addEventListener('click', () => {
    if (confirm('Reset all demo entries to initial state?')) {
      localStorage.removeItem(STORAGE_KEY_PASSES);
      localStorage.removeItem(STORAGE_KEY_ACTS);
      localStorage.removeItem(STORAGE_KEY_DEDS);
      localStorage.removeItem(STORAGE_KEY_VOTES);
      passes = defaultPasses;
      acts = defaultActs;
      dedications = defaultDedications;
      votes = defaultVotes;
      saveState();
      renderPerformances();
      renderDedications();
      renderVotingPolls();
      renderAdminPasses();
      renderAdminActs();
      updateAdminKPIs();
      alert('Data reset to defaults successfully.');
    }
  });

  // ==========================================
  // 9. MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // ==========================================
  // 10. CELEBRATION EFFECTS & WEB AUDIO CHIME
  // ==========================================
  function triggerCelebrationConfetti() {
    if (!window.confetti) return;
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }

  // Web Audio Synthesized Chime
  let audioContext = null;
  let audioEnabled = true;

  document.getElementById('audio-toggle-btn')?.addEventListener('click', (e) => {
    audioEnabled = !audioEnabled;
    const btn = e.currentTarget;
    btn.classList.toggle('text-amber-400', audioEnabled);
    btn.classList.toggle('text-slate-600', !audioEnabled);
    alert(`Celebration sound effects ${audioEnabled ? 'enabled' : 'disabled'}.`);
  });

  function playChime() {
    if (!audioEnabled) return;
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(audioContext.currentTime + i * 0.08);
        osc.stop(audioContext.currentTime + i * 0.08 + 0.6);
      });
    } catch (e) {
      console.log('Audio playback prevented or unsupported');
    }
  }

  // ==========================================
  // PWA SERVICE WORKER REGISTRATION
  // ==========================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('[PWA] Service Worker registered with scope:', reg.scope);
      }).catch((err) => {
        console.log('[PWA] Service Worker registration failed:', err);
      });
    });
  }

  // ==========================================
  // INITIAL RENDER
  // ==========================================
  renderPerformances();
  renderDedications();
  renderFacultyProfiles();
  renderVotingPolls();
  updateMetricsRibbon();

});
