(function () {
  'use strict';

  var STORAGE_KEY = 'harveysDatePlan_v1';

  var DEFAULT_FNAF_GAMES = [
    { id: 'fnaf-1', title: "Five Nights at Freddy's (FNAF 1)", done: false },
    { id: 'fnaf-sb', title: 'FNAF: Security Breach / Sister Location', done: false },
    { id: 'phasmo', title: 'Phasmophobia / Cozy Co-Op Spooks', done: false },
    { id: 'indie-horror', title: 'Short Indie Horror Surprise Pick', done: false }
  ];

  var DEFAULT_YOUTUBE_QUEUE = [
    { id: 'yt-1', title: "Harvey's Secret Menu & Fast Food Tier Lists", done: false },
    { id: 'yt-2', title: 'FNAF Lore & Funniest Jumpscare Compilations', done: false },
    { id: 'yt-3', title: 'Subnautica Leviathan Encounters & Base Builds', done: false },
    { id: 'yt-4', title: 'Try Not To Laugh / Weird Internet Rabbit Holes', done: false }
  ];

  var WANDAVISION_EPISODES = [
    { ep: 1, era: '1950s Sitcom Era', title: 'Ep 1: Filmed Before a Live Studio Audience', tagline: 'Black & white kitchen chaos + mysterious Stark toaster!' },
    { ep: 2, era: '1960s Bewitched Era', title: "Ep 2: Don't Touch That Dial", tagline: 'Talent show magic tricks & a sudden splash of color!' },
    { ep: 3, era: '1970s Brady Era', title: 'Ep 3: Now in Color', tagline: 'Technicolor nursery, twin surprises & butterfly chaos!' },
    { ep: 4, era: 'S.W.O.R.D. Outside View', title: 'Ep 4: We Interrupt This Program', tagline: 'Wait — what is actually happening outside Westview?!' },
    { ep: 5, era: '1980s Family Ties Era', title: 'Ep 5: On a Very Special Episode...', tagline: '80s synth vibes, Sparky & a shocking doorbell guest!' },
    { ep: 6, era: '1990s/2000s Halloween', title: 'Ep 6: All-New Halloween Spooktacular!', tagline: 'Comic-accurate Halloween costumes & spooky hex limits!' },
    { ep: 7, era: '2000s Mockumentary', title: 'Ep 7: Breaking the Fourth Wall', tagline: 'Modern sitcom confessionals — and Agatha All Along!' },
    { ep: 8, era: 'Memory Lane', title: 'Ep 8: Previously On', tagline: 'Tearjerker backstory, chaos magic & Ship of Theseus prep.' },
    { ep: 9, era: 'Westview Finale', title: 'Ep 9: The Series Finale', tagline: 'Scarlet Witch rises + big aerial showdown!' }
  ];

  var DEFAULT_ALARMS = [
    { id: 'al-1', time: '20:45', label: '15-Min Pre-Dive Snack & Blanket Check', armed: true },
    { id: 'al-2', time: '21:00', label: 'MAIN ALARM: Subnautica Gameplay Starts!', armed: true },
    { id: 'al-3', time: '21:05', label: 'Backup Leviathan Warning Alarm (Do Not Miss!)', armed: true }
  ];

  var DEFAULT_PREP_ITEMS = [
    { id: 'prep-1', text: 'Phone alarm set & volume turned ALL the way up', done: false },
    { id: 'prep-2', text: 'Download .ics calendar reminder just in case', done: false },
    { id: 'prep-3', text: "Refill drinks & crispy Harvey's snacks before dive", done: false },
    { id: 'prep-4', text: 'Headphones / cozy blanket ready for Reaper Leviathans', done: false }
  ];

  var TIMELINE_QUESTS = [
    { id: 'step-meal', step: 1, phase: 'Act I • Dinner', target: '#chicken-meal', title: "Order Him a Harvey's Chicken Sandwich Meal", desc: 'Pick his crispy/grilled chicken sandwich, load the toppings bar & lock in his combo.' },
    { id: 'step-fnaf', step: 2, phase: 'Act II • Spooky Time', target: '#fnaf-card', title: 'Watch Maddie Play FNAF & Horror Games', desc: 'Dim the lights, guard the doors, and count every glorious jumpscare.' },
    { id: 'step-youtube', step: 3, phase: 'Act III • Laughs', target: '#youtube-card', title: 'Watch YouTube Videos Together', desc: 'Cooldown laughs, tier lists, and snacking on Frings/Poutine.' },
    { id: 'step-wanda', step: 4, phase: 'Act IV • Westview', target: '#wandavision-card', title: 'Watch WandaVision', desc: 'Tune the Westview retro TV through sitcom decades and track episodes.' },
    { id: 'step-subnautica', step: 5, phase: 'Act V • Dive Alert!', target: '#subnautica-alarms', title: 'Alarms Armed for Subnautica Gameplay!', desc: 'Double-check every alarm so zero seconds of Subnautica get missed!' }
  ];

  var SCARE_REACTIONS = [
    "Power at 100% — Bonnie hasn't peeked yet...",
    'Wait... was that Chica by the kitchen cam?!',
    'HOLD THE DOOR! Flashlight flickering like crazy!',
    'FREDDY LAUGHED! Blanket shield deployed at max power!',
    'GOLDEN FREDDY MOMENT!! Everyone screamed & dropped a fry!',
    '5+ JUMPSCARES?! Certified FNAF survivors — time for chicken bites!'
  ];

  var CHICKEN_PUNS = [
    "Cluck around and find out: Harvey's + FNAF + YouTube + WandaVision + Subnautica = 10/10 night!",
    'No winging it tonight — every single chicken sandwich & Subnautica alarm is locked in!',
    'Zero fowl plays allowed, except maybe Freddy Fazbear jumping out of the hallway!',
    "This date plan is officially egg-stra crispy and 100% Harvey's certified!",
    "Don't chicken out during FNAF — and NEVER snooze the Subnautica alarm!"
  ];

  var audioCtx = null;
  var lastTriggeredMinute = '';

  function slugify(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'item';
  }

  function normalizeOptionItem(item, index) {
    if (typeof item === 'string') {
      return {
        id: slugify(item) + '-' + index,
        name: item,
        note: '',
        emoji: ''
      };
    }
    if (item && typeof item === 'object') {
      var label = item.name || item.label || item.title || ('Option ' + (index + 1));
      return {
        id: item.id || (slugify(label) + '-' + index),
        name: label,
        note: item.note || item.priceNote || item.extraPrice || item.category || '',
        emoji: item.emoji || item.icon || ''
      };
    }
    return { id: 'opt-' + index, name: 'Option ' + (index + 1), note: '', emoji: '' };
  }

  function getMenuData() {
    var raw = window.HARVEYS_DATE_MENU || {};
    var sandwiches = Array.isArray(raw.sandwiches) ? raw.sandwiches : [];
    var sides = (Array.isArray(raw.sides) ? raw.sides : ['Original Fries', 'Frings (Fries + Rings)', 'Onion Rings', 'Poutine'])
      .map(normalizeOptionItem);
    var drinks = (Array.isArray(raw.drinks) ? raw.drinks : ['Coca-Cola', 'Canada Dry Ginger Ale', 'Nestea Iced Tea', 'Root Beer'])
      .map(normalizeOptionItem);
    var toppings = (Array.isArray(raw.toppings) ? raw.toppings : ['Lettuce', 'Tomato', 'Pickles', 'Red Onions', 'Mayo', "Harvey's Sauce", 'Hot Peppers'])
      .map(normalizeOptionItem);

    return {
      sandwiches: sandwiches,
      sides: sides,
      drinks: drinks,
      toppings: toppings
    };
  }

  function createInitialState(menu) {
    var defaultToppings = [];
    for (var i = 0; i < menu.toppings.length && i < 4; i++) {
      defaultToppings.push(menu.toppings[i].name);
    }

    return {
      selectedSandwichId: menu.sandwiches[0] ? menu.sandwiches[0].id : '',
      selectedToppings: defaultToppings,
      selectedSideId: menu.sides[0] ? menu.sides[0].id : '',
      selectedDrinkId: menu.drinks[0] ? menu.drinks[0].id : '',
      mealNote: 'Extra crispy, extra pickles & made with love!',
      orderLocked: false,
      orderNumber: '#CHKN-' + String(Math.floor(10 + Math.random() * 89)),
      fnaf: {
        jumpscares: 0,
        mode: 'Cozy Blanket Shield',
        games: DEFAULT_FNAF_GAMES.map(function (g) { return { id: g.id, title: g.title, done: g.done }; })
      },
      youtube: {
        nowPlayingId: DEFAULT_YOUTUBE_QUEUE[0].id,
        items: DEFAULT_YOUTUBE_QUEUE.map(function (v) { return { id: v.id, title: v.title, done: v.done }; })
      },
      wanda: {
        currentEp: 1,
        watchedEps: []
      },
      subnautica: {
        alarms: DEFAULT_ALARMS.map(function (a) { return { id: a.id, time: a.time, label: a.label, armed: a.armed }; }),
        prepDone: []
      },
      timelineDone: []
    };
  }

  function loadState(menu) {
    var fallback = createInitialState(menu);
    try {
      var saved = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (!saved) return fallback;
      var parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object') return fallback;

      if (parsed.selectedSandwichId && menu.sandwiches.some(function (s) { return s.id === parsed.selectedSandwichId; })) {
        fallback.selectedSandwichId = parsed.selectedSandwichId;
      }
      if (Array.isArray(parsed.selectedToppings)) {
        fallback.selectedToppings = parsed.selectedToppings;
      }
      if (parsed.selectedSideId && menu.sides.some(function (s) { return s.id === parsed.selectedSideId; })) {
        fallback.selectedSideId = parsed.selectedSideId;
      }
      if (parsed.selectedDrinkId && menu.drinks.some(function (d) { return d.id === parsed.selectedDrinkId; })) {
        fallback.selectedDrinkId = parsed.selectedDrinkId;
      }
      if (typeof parsed.mealNote === 'string') fallback.mealNote = parsed.mealNote;
      if (typeof parsed.orderLocked === 'boolean') fallback.orderLocked = parsed.orderLocked;
      if (typeof parsed.orderNumber === 'string') fallback.orderNumber = parsed.orderNumber;

      if (parsed.fnaf && typeof parsed.fnaf === 'object') {
        if (typeof parsed.fnaf.jumpscares === 'number') fallback.fnaf.jumpscares = Math.max(0, parsed.fnaf.jumpscares);
        if (typeof parsed.fnaf.mode === 'string') fallback.fnaf.mode = parsed.fnaf.mode;
        if (Array.isArray(parsed.fnaf.games) && parsed.fnaf.games.length) fallback.fnaf.games = parsed.fnaf.games;
      }
      if (parsed.youtube && typeof parsed.youtube === 'object') {
        if (parsed.youtube.nowPlayingId) fallback.youtube.nowPlayingId = parsed.youtube.nowPlayingId;
        if (Array.isArray(parsed.youtube.items) && parsed.youtube.items.length) fallback.youtube.items = parsed.youtube.items;
      }
      if (parsed.wanda && typeof parsed.wanda === 'object') {
        if (typeof parsed.wanda.currentEp === 'number') fallback.wanda.currentEp = Math.min(9, Math.max(1, parsed.wanda.currentEp));
        if (Array.isArray(parsed.wanda.watchedEps)) fallback.wanda.watchedEps = parsed.wanda.watchedEps;
      }
      if (parsed.subnautica && typeof parsed.subnautica === 'object') {
        if (Array.isArray(parsed.subnautica.alarms)) fallback.subnautica.alarms = parsed.subnautica.alarms;
        if (Array.isArray(parsed.subnautica.prepDone)) fallback.subnautica.prepDone = parsed.subnautica.prepDone;
      }
      if (Array.isArray(parsed.timelineDone)) {
        fallback.timelineDone = parsed.timelineDone;
      }
      return fallback;
    } catch (err) {
      return fallback;
    }
  }

  function saveState(state) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (err) {
      // Ignore storage errors on restricted file:// contexts
    }
  }

  /* ---------- Real Online Chicken MP3 Sound Effects + Emergency Synth Fallback ---------- */
  var CHICKEN_SOUND_URLS = {
    cluck: 'https://assets.mixkit.co/active_storage/sfx/1772/1772-preview.mp3',
    cluckAlt: 'https://orangefreesounds.com/wp-content/uploads/2023/08/Chicken-cluck-sound-effect.mp3',
    squawk: 'https://bigsoundbank.com/UPLOAD/mp3/0453.mp3',
    roosterAlarm: 'https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3'
  };

  var preloadedAudioCache = {};
  var activeAudioClips = [];
  var cluckToggleIndex = 0;

  function warmChickenAudioCache() {
    if (typeof window.Audio !== 'function') return;
    Object.keys(CHICKEN_SOUND_URLS).forEach(function (key) {
      var url = CHICKEN_SOUND_URLS[key];
      try {
        var pre = new window.Audio(url);
        pre.preload = 'auto';
        pre.load();
        preloadedAudioCache[key] = pre;
      } catch (err) {
        // Ignore preload errors
      }
    });
  }

  function getAudioContext() {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtx) {
        audioCtx = new AudioCtx();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    } catch (err) {
      return null;
    }
  }

  function playTone(ctx, freq, startOffset, duration, type, volume) {
    var now = ctx.currentTime + startOffset;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume || 0.16, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function synthAlarmEmergency() {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var bellNotes = [880, 1174.66, 880, 1174.66, 880, 1174.66];
      for (var i = 0; i < bellNotes.length; i++) {
        playTone(ctx, bellNotes[i], i * 0.11, 0.12, 'square', 0.08);
      }
      playTone(ctx, 523.25, 0.72, 0.35, 'sine', 0.18);
      playTone(ctx, 1046.5, 0.92, 0.45, 'sine', 0.14);
    } catch (err) {
      // Safe no-op if audio blocked
    }
  }

  function synthCluckEmergency() {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var now = ctx.currentTime;
      var syllables = [
        { t: 0, f1: 310, f2: 470, dur: 0.09 },
        { t: 0.12, f1: 350, f2: 590, dur: 0.13 },
        { t: 0.28, f1: 420, f2: 260, dur: 0.14 }
      ];
      syllables.forEach(function (s) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(s.f1, now + s.t);
        osc.frequency.exponentialRampToValueAtTime(s.f2, now + s.t + s.dur);
        gain.gain.setValueAtTime(0.001, now + s.t);
        gain.gain.exponentialRampToValueAtTime(0.11, now + s.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + s.t + s.dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + s.t);
        osc.stop(now + s.t + s.dur + 0.02);
      });
    } catch (err) {
      // Safe no-op
    }
  }

  function synthJumpscareEmergency() {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      playTone(ctx, 220, 0, 0.1, 'sawtooth', 0.09);
      playTone(ctx, 660, 0.07, 0.18, 'triangle', 0.12);
    } catch (err) {
      // Safe no-op
    }
  }

  function releaseClip(clip) {
    var idx = activeAudioClips.indexOf(clip);
    if (idx !== -1) activeAudioClips.splice(idx, 1);
  }

  function playOnlineMp3(url, volume, onFailure) {
    try {
      if (typeof window.Audio !== 'function' || !url) {
        if (typeof onFailure === 'function') onFailure();
        return null;
      }

      var clip = new window.Audio(url);
      clip.volume = typeof volume === 'number' ? volume : 0.8;
      clip.preload = 'auto';
      activeAudioClips.push(clip);

      var failed = false;
      var handleFailure = function () {
        if (failed) return;
        failed = true;
        releaseClip(clip);
        if (typeof onFailure === 'function') onFailure();
      };

      clip.addEventListener('ended', function () {
        releaseClip(clip);
      }, { once: true });

      clip.addEventListener('error', handleFailure, { once: true });

      var playPromise = clip.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function (err) {
          if (!err || (err.name !== 'AbortError' && err.name !== 'NotAllowedError')) {
            handleFailure();
          }
        });
      }
      return clip;
    } catch (err) {
      if (typeof onFailure === 'function') onFailure();
      return null;
    }
  }

  function playAudioWithBackup(primaryUrl, backupUrl, volume, emergencySynthFn) {
    return playOnlineMp3(primaryUrl, volume, function () {
      if (backupUrl && backupUrl !== primaryUrl) {
        playOnlineMp3(backupUrl, volume, emergencySynthFn);
      } else if (typeof emergencySynthFn === 'function') {
        emergencySynthFn();
      }
    });
  }

  function playCartoonAlarmChime() {
    return playAudioWithBackup(
      CHICKEN_SOUND_URLS.roosterAlarm,
      CHICKEN_SOUND_URLS.cluck,
      0.85,
      synthAlarmEmergency
    );
  }

  function playCluckSound() {
    var primary = cluckToggleIndex % 2 === 0 ? CHICKEN_SOUND_URLS.cluck : CHICKEN_SOUND_URLS.cluckAlt;
    var backup = cluckToggleIndex % 2 === 0 ? CHICKEN_SOUND_URLS.cluckAlt : CHICKEN_SOUND_URLS.cluck;
    cluckToggleIndex += 1;
    return playAudioWithBackup(primary, backup, 0.8, synthCluckEmergency);
  }

  function playJumpscareBoing() {
    return playAudioWithBackup(
      CHICKEN_SOUND_URLS.squawk,
      CHICKEN_SOUND_URLS.cluckAlt,
      0.82,
      synthJumpscareEmergency
    );
  }

  window.HARVEYS_SOUND_FX = {
    urls: CHICKEN_SOUND_URLS,
    preloaded: preloadedAudioCache,
    activeClips: activeAudioClips,
    playCluckSound: playCluckSound,
    playJumpscareBoing: playJumpscareBoing,
    playCartoonAlarmChime: playCartoonAlarmChime
  };

  /* ---------- Confetti Burst ---------- */
  function launchConfetti(anchorEl) {
    var colors = ['#ff6b00', '#ffb703', '#d90429', '#00b4d8', '#fff9ef', '#7b2cbf'];
    var rect = anchorEl ? anchorEl.getBoundingClientRect() : null;
    var originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    var originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    var container = document.createElement('div');
    container.className = 'confetti-burst-layer';
    container.setAttribute('aria-hidden', 'true');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    for (var i = 0; i < 26; i++) {
      var piece = document.createElement('span');
      piece.className = 'confetti-piece';
      var angle = (Math.PI * 2 * i) / 26 + (Math.random() * 0.35 - 0.17);
      var dist = 70 + Math.random() * 140;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist - 40;
      var rot = Math.round(Math.random() * 540 - 270);

      piece.style.position = 'fixed';
      piece.style.left = originX + 'px';
      piece.style.top = originY + 'px';
      piece.style.width = (8 + Math.random() * 7) + 'px';
      piece.style.height = (8 + Math.random() * 7) + 'px';
      piece.style.background = colors[i % colors.length];
      piece.style.border = '2px solid #1b1108';
      piece.style.borderRadius = i % 3 === 0 ? '50%' : '3px';
      piece.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out';
      piece.style.transform = 'translate(-50%, -50%) scale(1)';
      piece.style.opacity = '1';
      container.appendChild(piece);

      (function (el, tx, ty, tr) {
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            el.style.transform = 'translate(calc(-50% + ' + tx.toFixed(1) + 'px), calc(-50% + ' + (ty + 75).toFixed(1) + 'px)) rotate(' + tr + 'deg) scale(0.75)';
            el.style.opacity = '0';
          });
        });
      })(piece, dx, dy, rot);
    }

    window.setTimeout(function () {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 1050);
  }

  /* ---------- Chicken Art Mounting ---------- */
  function mountChicken(targetEl, key, extraClass) {
    if (!targetEl) return;
    if (typeof window.mountChickenArt === 'function') {
      window.mountChickenArt(targetEl, key, extraClass || '');
      return;
    }
    if (window.CHICKEN_ART && window.CHICKEN_ART[key]) {
      targetEl.innerHTML = window.CHICKEN_ART[key];
      if (extraClass) {
        extraClass.split(/\s+/).forEach(function (cls) {
          if (cls) targetEl.classList.add(cls);
        });
      }
    }
  }

  function mountAllStaticChickens() {
    mountChicken(document.getElementById('hero-chicken-slot'), 'heroChef');
    mountChicken(document.getElementById('meal-chicken-slot'), 'drumstickCheer');
    mountChicken(document.getElementById('fnaf-chicken-slot'), 'fnafScared');
    mountChicken(document.getElementById('youtube-chicken-slot'), 'couchWatch');
    mountChicken(document.getElementById('wandavision-chicken-slot'), 'cluckHeart');
    mountChicken(document.getElementById('subnautica-chicken-slot'), 'subnauticaAlarm');

    var subSlot = document.getElementById('subnautica-chicken-slot');
    if (subSlot && !subSlot.querySelector('.spice-pill')) {
      var subBadge = document.createElement('span');
      subBadge.className = 'spice-pill';
      subBadge.textContent = 'DIVE BELL READY!';
      subSlot.appendChild(subBadge);
    }

    var peekingNodes = document.querySelectorAll('[data-chicken]');
    peekingNodes.forEach(function (node) {
      var key = node.getAttribute('data-chicken');
      mountChicken(node, key);
    });

    // Chicken Parade Strip in Hero
    var paradeStrip = document.getElementById('chicken-parade-strip');
    if (paradeStrip) {
      paradeStrip.innerHTML = '';
      var paradeList = [
        { key: 'peekLeft', label: 'Crispy Check!' },
        { key: 'drumstickCheer', label: 'Extra Pickles!' },
        { key: 'fnafScared', label: 'FNAF Watch!' },
        { key: 'couchWatch', label: 'YouTube & Wanda!' },
        { key: 'subnauticaAlarm', label: 'ALARM READY!' },
        { key: 'cluckHeart', label: 'Date Night!' }
      ];
      paradeList.forEach(function (item) {
        var chip = null;
        if (typeof window.createFloatingChickenSticker === 'function') {
          chip = window.createFloatingChickenSticker(item.key, item.label);
        } else {
          chip = document.createElement('div');
          chip.className = 'chicken-sticker';
          var artBox = document.createElement('span');
          mountChicken(artBox, item.key);
          var cap = document.createElement('span');
          cap.textContent = item.label;
          chip.appendChild(artBox);
          chip.appendChild(cap);
        }
        if (chip) {
          chip.setAttribute('role', 'button');
          chip.setAttribute('tabindex', '0');
          chip.style.cursor = 'pointer';
          chip.title = 'Click for a lucky cluck!';
          chip.addEventListener('click', function () {
            playCluckSound();
            chip.classList.remove('is-clucking');
            void chip.offsetWidth;
            chip.classList.add('is-clucking');
          });
          chip.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              chip.click();
            }
          });
          paradeStrip.appendChild(chip);
        }
      });
    }

    // Footer Chickens
    var footerChickens = document.getElementById('footer-chickens');
    if (footerChickens) {
      footerChickens.innerHTML = '';
      [
        { key: 'peekLeft', label: 'Peek-a-Cluck' },
        { key: 'drumstickCheer', label: "Harvey's #1 Fan" },
        { key: 'cluckHeart', label: 'Date Night Vibes' },
        { key: 'subnauticaAlarm', label: 'Alarm Squad' },
        { key: 'peekRight', label: 'Extra Crispy' }
      ].forEach(function (item) {
        var sticker = null;
        if (typeof window.createFloatingChickenSticker === 'function') {
          sticker = window.createFloatingChickenSticker(item.key, item.label);
        } else {
          sticker = document.createElement('div');
          sticker.className = 'chicken-sticker';
          mountChicken(sticker, item.key);
          var span = document.createElement('span');
          span.textContent = item.label;
          sticker.appendChild(span);
        }
        if (sticker) footerChickens.appendChild(sticker);
      });
    }
  }

  /* ---------- Section 1: Harvey's Chicken Sandwich Menu & Meal Builder ---------- */
  function getSpiceClass(spiceText) {
    var s = String(spiceText || '').toLowerCase();
    if (/sweet/.test(s) || /medium|kick|zesty|tangy/.test(s)) return 'spice-pill--medium';
    if (/hot|ghost|fiery|spicy|buffalo/.test(s)) return 'spice-pill--hot';
    return 'spice-pill--mild';
  }

  function renderSandwiches(menu, state) {
    var grid = document.getElementById('sandwich-grid');
    if (!grid) return;
    grid.innerHTML = '';

    var countNote = document.getElementById('sandwich-count-note');
    if (countNote) {
      countNote.textContent = menu.sandwiches.length + " Real Harvey's Chicken Sandwiches";
    }

    if (!menu.sandwiches.length) {
      var emptyMsg = document.createElement('p');
      emptyMsg.textContent = "Loading Harvey's chicken menu...";
      grid.appendChild(emptyMsg);
      return;
    }

    menu.sandwiches.forEach(function (sandwich) {
      var isSelected = state.selectedSandwichId === sandwich.id;
      var card = document.createElement('article');
      card.className = 'sandwich-card' + (isSelected ? ' is-selected' : '');
      card.setAttribute('role', 'listitem');

      // Photo wrapper with badge inside top-left + graceful fallback
      var photoWrap = document.createElement('div');
      photoWrap.className = 'sandwich-photo-wrap';

      if (sandwich.badge) {
        var badge = document.createElement('span');
        badge.className = 'sandwich-badge';
        badge.textContent = sandwich.badge;
        photoWrap.appendChild(badge);
      }

      var img = document.createElement('img');
      img.className = 'sandwich-photo';
      img.setAttribute('referrerpolicy', 'no-referrer');
      img.alt = sandwich.name + " from Harvey's Canada";
      img.src = sandwich.imageUrl || '';

      var fallbackBox = document.createElement('div');
      fallbackBox.className = 'sandwich-fallback';
      fallbackBox.hidden = true;

      var fallbackChicken = document.createElement('div');
      fallbackChicken.className = 'sandwich-fallback-chicken';
      fallbackChicken.style.width = '64px';
      fallbackChicken.style.height = '64px';
      mountChicken(fallbackChicken, 'heroChef');
      fallbackBox.appendChild(fallbackChicken);

      var fallbackTitle = document.createElement('strong');
      fallbackTitle.textContent = sandwich.name;
      fallbackBox.appendChild(fallbackTitle);

      var fallbackLink = document.createElement('a');
      fallbackLink.href = sandwich.fallbackQueryUrl || ('https://www.google.com/search?tbm=isch&q=' + encodeURIComponent("Harvey's " + sandwich.name));
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      fallbackLink.className = 'mini-btn';
      fallbackLink.textContent = 'View Photo on Google Images ↗';
      fallbackBox.appendChild(fallbackLink);

      img.addEventListener('error', function () {
        img.hidden = true;
        fallbackBox.hidden = false;
      });

      photoWrap.appendChild(img);
      photoWrap.appendChild(fallbackBox);
      card.appendChild(photoWrap);

      // Copy & metadata
      var body = document.createElement('div');
      body.style.display = 'flex';
      body.style.flexDirection = 'column';
      body.style.flex = '1';
      body.style.justifyContent = 'space-between';
      body.style.gap = '0.5rem';

      var topCopy = document.createElement('div');

      var metaRow = document.createElement('div');
      metaRow.className = 'sandwich-meta-row';
      metaRow.style.marginBottom = '0.4rem';

      if (sandwich.spiceLevel) {
        var spice = document.createElement('span');
        spice.className = 'spice-pill ' + getSpiceClass(sandwich.spiceLevel);
        spice.textContent = sandwich.spiceLevel;
        metaRow.appendChild(spice);
      }

      if (sandwich.mealPriceNote) {
        var priceNote = document.createElement('span');
        priceNote.className = 'sandwich-source-note';
        priceNote.style.fontWeight = '800';
        priceNote.textContent = sandwich.mealPriceNote;
        metaRow.appendChild(priceNote);
      }

      topCopy.appendChild(metaRow);

      var title = document.createElement('h4');
      title.style.fontSize = '1.15rem';
      title.style.fontWeight = '800';
      title.textContent = sandwich.name;
      topCopy.appendChild(title);

      if (sandwich.tagline) {
        var tagline = document.createElement('p');
        tagline.className = 'sandwich-tagline';
        tagline.textContent = sandwich.tagline;
        topCopy.appendChild(tagline);
      }

      if (sandwich.description) {
        var desc = document.createElement('p');
        desc.className = 'sandwich-description';
        desc.textContent = sandwich.description;
        topCopy.appendChild(desc);
      }

      body.appendChild(topCopy);

      var bottomBlock = document.createElement('div');
      bottomBlock.style.display = 'flex';
      bottomBlock.style.flexDirection = 'column';
      bottomBlock.style.gap = '0.5rem';

      if (sandwich.sourceLabel || sandwich.officialUrl || sandwich.fallbackQueryUrl) {
        var srcLink = document.createElement('a');
        srcLink.className = 'sandwich-source-note';
        srcLink.href = sandwich.officialUrl || sandwich.fallbackQueryUrl || '#';
        srcLink.target = '_blank';
        srcLink.rel = 'noopener noreferrer';
        srcLink.textContent = (sandwich.sourceLabel ? 'Menu: ' + sandwich.sourceLabel : 'Search Harvey\'s photo') + ' ↗';
        bottomBlock.appendChild(srcLink);
      }

      var selectBtn = document.createElement('button');
      selectBtn.type = 'button';
      selectBtn.className = 'cartoon-btn ' + (isSelected ? 'cartoon-btn--gold' : '');
      selectBtn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      selectBtn.style.width = '100%';
      selectBtn.textContent = isSelected ? '✓ Selected for His Meal!' : 'Pick This Sandwich';
      selectBtn.addEventListener('click', function () {
        state.selectedSandwichId = sandwich.id;
        state.orderLocked = false;
        saveState(state);
        renderSandwiches(menu, state);
        renderOrderTicket(menu, state);
      });
      bottomBlock.appendChild(selectBtn);

      body.appendChild(bottomBlock);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function renderToppings(menu, state) {
    var grid = document.getElementById('toppings-grid');
    if (!grid) return;
    grid.innerHTML = '';

    menu.toppings.forEach(function (topping) {
      var active = state.selectedToppings.indexOf(topping.name) !== -1;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'topping-chip' + (active ? ' is-selected' : '');
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.textContent = (topping.emoji ? topping.emoji + ' ' : '') + topping.name + (topping.note ? ' (' + topping.note + ')' : '');
      btn.addEventListener('click', function () {
        var idx = state.selectedToppings.indexOf(topping.name);
        if (idx === -1) {
          state.selectedToppings.push(topping.name);
        } else {
          state.selectedToppings.splice(idx, 1);
        }
        state.orderLocked = false;
        saveState(state);
        renderToppings(menu, state);
        renderOrderTicket(menu, state);
      });
      grid.appendChild(btn);
    });
  }

  function renderComboOptions(containerId, items, selectedId, onSelect) {
    var wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.innerHTML = '';

    items.forEach(function (item) {
      var active = selectedId === item.id;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'combo-chip' + (active ? ' is-selected' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', active ? 'true' : 'false');
      btn.textContent = (item.emoji ? item.emoji + ' ' : '') + item.name + (item.note ? ' · ' + item.note : '');
      btn.addEventListener('click', function () {
        onSelect(item.id);
      });
      wrap.appendChild(btn);
    });
  }

  function buildOrderPlainText(menu, state) {
    var sandwich = menu.sandwiches.filter(function (s) { return s.id === state.selectedSandwichId; })[0] || menu.sandwiches[0];
    var side = menu.sides.filter(function (s) { return s.id === state.selectedSideId; })[0] || menu.sides[0];
    var drink = menu.drinks.filter(function (d) { return d.id === state.selectedDrinkId; })[0] || menu.drinks[0];
    var toppingsText = state.selectedToppings.length ? state.selectedToppings.join(', ') : 'Plain & Crispy (no toppings)';

    return [
      "HARVEY'S DATE MEAL ORDER " + state.orderNumber,
      'Sandwich: ' + (sandwich ? sandwich.name : 'Crispy Chicken Sandwich'),
      'Toppings: ' + toppingsText,
      'Side: ' + (side ? side.name : 'Fries'),
      'Drink: ' + (drink ? drink.name : 'Soft Drink'),
      'Note: ' + (state.mealNote || 'Made with love!')
    ].join('\n');
  }

  function renderOrderTicket(menu, state) {
    var body = document.getElementById('ticket-body');
    var numEl = document.getElementById('ticket-order-num');
    var statusEl = document.getElementById('order-status-msg');
    var lockBtn = document.getElementById('lock-order-btn');
    var stampEl = document.getElementById('ticket-stamp');
    if (!body) return;

    var sandwich = menu.sandwiches.filter(function (s) { return s.id === state.selectedSandwichId; })[0] || menu.sandwiches[0];
    var side = menu.sides.filter(function (s) { return s.id === state.selectedSideId; })[0] || menu.sides[0];
    var drink = menu.drinks.filter(function (d) { return d.id === state.selectedDrinkId; })[0] || menu.drinks[0];

    if (numEl) numEl.textContent = state.orderNumber;
    body.innerHTML = '';

    var rows = [
      { label: 'FOR', value: 'Him (VIP Chicken Combo)' },
      { label: 'SANDWICH', value: sandwich ? sandwich.name : "Harvey's Chicken Sandwich" },
      { label: 'TOPPINGS', value: state.selectedToppings.length ? state.selectedToppings.join(', ') : 'Plain & Crispy' },
      { label: 'SIDE', value: side ? side.name : 'Frings' },
      { label: 'DRINK', value: drink ? drink.name : 'Ginger Ale' },
      { label: 'NOTE', value: state.mealNote ? '"' + state.mealNote + '"' : 'Extra crispy!' }
    ];

    rows.forEach(function (r) {
      var line = document.createElement('div');
      line.className = 'order-ticket-line';
      var k = document.createElement('span');
      k.style.fontWeight = '800';
      k.textContent = r.label;
      var v = document.createElement('strong');
      v.style.textAlign = 'right';
      v.textContent = r.value;
      line.appendChild(k);
      line.appendChild(v);
      body.appendChild(line);
    });

    if (stampEl) {
      stampEl.textContent = state.orderLocked ? 'STAMPED & LOCKED!' : 'CUSTOM BUILD';
    }
    if (lockBtn) {
      lockBtn.textContent = state.orderLocked ? '✅ Meal Locked In!' : '🍔 Lock In His Meal!';
    }
    if (statusEl) {
      statusEl.textContent = state.orderLocked
        ? "Order locked in & saved! Harvey's perfection awaits."
        : 'Customize toppings, side & drink, then lock in his meal!';
    }
  }

  function bindMealSection(menu, state) {
    renderSandwiches(menu, state);
    renderToppings(menu, state);
    renderComboOptions('sides-options', menu.sides, state.selectedSideId, function (id) {
      state.selectedSideId = id;
      state.orderLocked = false;
      saveState(state);
      bindMealSection(menu, state);
    });
    renderComboOptions('drinks-options', menu.drinks, state.selectedDrinkId, function (id) {
      state.selectedDrinkId = id;
      state.orderLocked = false;
      saveState(state);
      bindMealSection(menu, state);
    });
    renderOrderTicket(menu, state);

    var noteInput = document.getElementById('meal-custom-note');
    if (noteInput && !noteInput.dataset.bound) {
      noteInput.dataset.bound = '1';
      noteInput.value = state.mealNote || '';
      noteInput.addEventListener('input', function () {
        state.mealNote = noteInput.value;
        state.orderLocked = false;
        saveState(state);
        renderOrderTicket(menu, state);
      });
    }

    var presetBtns = document.querySelectorAll('[data-topping-preset]');
    presetBtns.forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        var preset = btn.getAttribute('data-topping-preset');
        var allNames = menu.toppings.map(function (t) { return t.name; });
        if (preset === 'clear') {
          state.selectedToppings = [];
        } else if (preset === 'works') {
          state.selectedToppings = allNames.filter(function (n) {
            return /^(lettuce|tomatoes?|pickles?|onions?|harv sauce|light mayo|crispy bacon|cheddar-style cheese)$/i.test(n);
          });
          if (!state.selectedToppings.length) state.selectedToppings = allNames.slice(0, Math.min(allNames.length, 6));
        } else if (preset === 'spicy') {
          state.selectedToppings = allNames.filter(function (n) {
            return /jalap|hot peppers|buffalo|chipotle|ghost pepper|onions|pickles/i.test(n);
          });
          if (!state.selectedToppings.length) state.selectedToppings = allNames.slice(0, 3);
        } else {
          state.selectedToppings = allNames.filter(function (n) {
            return /^(lettuce|tomatoes?|pickles?|onions?|harv sauce|light mayo|mayo)$/i.test(n);
          });
          if (!state.selectedToppings.length) state.selectedToppings = allNames.slice(0, 4);
        }
        state.orderLocked = false;
        saveState(state);
        renderToppings(menu, state);
        renderOrderTicket(menu, state);
      });
    });

    var lockBtn = document.getElementById('lock-order-btn');
    if (lockBtn && !lockBtn.dataset.bound) {
      lockBtn.dataset.bound = '1';
      lockBtn.addEventListener('click', function () {
        state.orderLocked = true;
        saveState(state);
        renderOrderTicket(menu, state);
        playCluckSound();
        launchConfetti(lockBtn);
      });
    }

    var copyBtn = document.getElementById('copy-order-btn');
    if (copyBtn && !copyBtn.dataset.bound) {
      copyBtn.dataset.bound = '1';
      copyBtn.addEventListener('click', function () {
        var text = buildOrderPlainText(menu, state);
        var statusEl = document.getElementById('order-status-msg');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            if (statusEl) statusEl.textContent = "Copied his Harvey's order to clipboard!";
          }, function () {
            if (statusEl) statusEl.textContent = 'Order ready above — screenshot or read out the ticket!';
          });
        } else if (statusEl) {
          statusEl.textContent = "Order ready above — read out the ticket at Harvey's!";
        }
      });
    }
  }

  /* ---------- Section 2A: FNAF & Horror Games ---------- */
  function renderFnafSection(state) {
    var countBadge = document.getElementById('jumpscare-count-badge');
    var meterFill = document.getElementById('jumpscare-meter-fill');
    var reactionEl = document.getElementById('scare-reaction-text');
    var listEl = document.getElementById('fnaf-watchlist');
    var count = state.fnaf.jumpscares;

    if (countBadge) {
      countBadge.textContent = count + (count === 1 ? ' Jumpscare' : ' Jumpscares');
    }
    if (meterFill) {
      var pct = Math.min(100, Math.max(8, count * 16 + 8));
      meterFill.style.width = pct + '%';
    }
    if (reactionEl) {
      var idx = Math.min(SCARE_REACTIONS.length - 1, count);
      reactionEl.textContent = SCARE_REACTIONS[idx] + ' (' + state.fnaf.mode + ')';
    }

    document.querySelectorAll('[data-fnaf-mode]').forEach(function (btn) {
      var mode = btn.getAttribute('data-fnaf-mode');
      var active = state.fnaf.mode === mode;
      btn.classList.toggle('is-selected', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (listEl) {
      listEl.innerHTML = '';
      state.fnaf.games.forEach(function (game) {
        var li = document.createElement('li');
        li.className = 'watchlist-item' + (game.done ? ' is-done' : '');

        var checkBtn = document.createElement('button');
        checkBtn.type = 'button';
        checkBtn.className = 'checklist-toggle-btn';
        checkBtn.setAttribute('aria-pressed', game.done ? 'true' : 'false');
        checkBtn.textContent = (game.done ? '☑ ' : '☐ ') + game.title;
        checkBtn.addEventListener('click', function () {
          game.done = !game.done;
          saveState(state);
          renderFnafSection(state);
        });

        var rmBtn = document.createElement('button');
        rmBtn.type = 'button';
        rmBtn.className = 'mini-btn';
        rmBtn.setAttribute('aria-label', 'Remove ' + game.title);
        rmBtn.textContent = '✕';
        rmBtn.addEventListener('click', function () {
          state.fnaf.games = state.fnaf.games.filter(function (g) { return g.id !== game.id; });
          saveState(state);
          renderFnafSection(state);
        });

        li.appendChild(checkBtn);
        li.appendChild(rmBtn);
        listEl.appendChild(li);
      });
    }
  }

  function bindFnafSection(state) {
    renderFnafSection(state);

    var plusBtn = document.getElementById('jumpscare-plus-btn');
    if (plusBtn && !plusBtn.dataset.bound) {
      plusBtn.dataset.bound = '1';
      plusBtn.addEventListener('click', function () {
        state.fnaf.jumpscares += 1;
        saveState(state);
        renderFnafSection(state);
        playJumpscareBoing();
        var card = document.getElementById('fnaf-card');
        if (card) {
          card.classList.remove('is-spooked');
          void card.offsetWidth;
          card.classList.add('is-spooked');
        }
      });
    }

    var resetBtn = document.getElementById('jumpscare-reset-btn');
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.dataset.bound = '1';
      resetBtn.addEventListener('click', function () {
        state.fnaf.jumpscares = 0;
        saveState(state);
        renderFnafSection(state);
      });
    }

    document.querySelectorAll('[data-fnaf-mode]').forEach(function (btn) {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function () {
        state.fnaf.mode = btn.getAttribute('data-fnaf-mode');
        saveState(state);
        renderFnafSection(state);
      });
    });

    var form = document.getElementById('fnaf-add-form');
    var input = document.getElementById('fnaf-game-input');
    if (form && input && !form.dataset.bound) {
      form.dataset.bound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = input.value.trim();
        if (!val) return;
        state.fnaf.games.push({
          id: 'game-' + Date.now(),
          title: val,
          done: false
        });
        input.value = '';
        saveState(state);
        renderFnafSection(state);
      });
    }
  }

  /* ---------- Section 2B: YouTube Queue ---------- */
  function renderYoutubeSection(state) {
    var listEl = document.getElementById('youtube-list');
    var nowEl = document.getElementById('youtube-now-playing');
    var progEl = document.getElementById('youtube-progress-note');
    var watchedCount = state.youtube.items.filter(function (v) { return v.done; }).length;

    if (progEl) {
      progEl.textContent = watchedCount + ' / ' + state.youtube.items.length + ' watched';
    }

    var activeVideo = state.youtube.items.filter(function (v) { return v.id === state.youtube.nowPlayingId; })[0]
      || state.youtube.items.filter(function (v) { return !v.done; })[0]
      || state.youtube.items[0];

    if (nowEl) {
      nowEl.textContent = activeVideo
        ? '▶ Up Next: ' + activeVideo.title
        : '▶ Queue empty — add a video below!';
    }

    if (!listEl) return;
    listEl.innerHTML = '';

    state.youtube.items.forEach(function (video) {
      var isCurrent = activeVideo && video.id === activeVideo.id;
      var li = document.createElement('li');
      li.className = 'youtube-queue-item' + (video.done ? ' is-done' : '') + (isCurrent ? ' is-current' : '');

      var toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'checklist-toggle-btn';
      toggleBtn.setAttribute('aria-pressed', video.done ? 'true' : 'false');
      toggleBtn.textContent = (video.done ? '☑ ' : '☐ ') + video.title;
      toggleBtn.addEventListener('click', function () {
        video.done = !video.done;
        saveState(state);
        renderYoutubeSection(state);
      });

      var actions = document.createElement('span');
      actions.style.display = 'inline-flex';
      actions.style.gap = '0.35rem';
      actions.style.flexShrink = '0';

      var playBtn = document.createElement('button');
      playBtn.type = 'button';
      playBtn.className = 'mini-btn';
      playBtn.textContent = isCurrent ? '▶ Next' : 'Queue';
      playBtn.addEventListener('click', function () {
        state.youtube.nowPlayingId = video.id;
        saveState(state);
        renderYoutubeSection(state);
      });

      var rmBtn = document.createElement('button');
      rmBtn.type = 'button';
      rmBtn.className = 'mini-btn';
      rmBtn.setAttribute('aria-label', 'Remove ' + video.title);
      rmBtn.textContent = '✕';
      rmBtn.addEventListener('click', function () {
        state.youtube.items = state.youtube.items.filter(function (v) { return v.id !== video.id; });
        saveState(state);
        renderYoutubeSection(state);
      });

      actions.appendChild(playBtn);
      actions.appendChild(rmBtn);
      li.appendChild(toggleBtn);
      li.appendChild(actions);
      listEl.appendChild(li);
    });
  }

  function bindYoutubeSection(state) {
    renderYoutubeSection(state);

    var form = document.getElementById('youtube-add-form');
    var input = document.getElementById('youtube-video-input');
    if (form && input && !form.dataset.bound) {
      form.dataset.bound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = input.value.trim();
        if (!val) return;
        var newItem = {
          id: 'yt-' + Date.now(),
          title: val,
          done: false
        };
        state.youtube.items.push(newItem);
        state.youtube.nowPlayingId = newItem.id;
        input.value = '';
        saveState(state);
        renderYoutubeSection(state);
      });
    }

    var randomBtn = document.getElementById('youtube-random-btn');
    if (randomBtn && !randomBtn.dataset.bound) {
      randomBtn.dataset.bound = '1';
      randomBtn.addEventListener('click', function () {
        var unwatched = state.youtube.items.filter(function (v) { return !v.done; });
        var pool = unwatched.length ? unwatched : state.youtube.items;
        if (!pool.length) return;
        var pick = pool[Math.floor(Math.random() * pool.length)];
        state.youtube.nowPlayingId = pick.id;
        saveState(state);
        renderYoutubeSection(state);
        playCluckSound();
      });
    }
  }

  /* ---------- Section 2C: WandaVision Retro TV & Tracker ---------- */
  function renderWandaSection(state) {
    var epObj = WANDAVISION_EPISODES.filter(function (e) { return e.ep === state.wanda.currentEp; })[0] || WANDAVISION_EPISODES[0];
    var eraEl = document.getElementById('wanda-era-badge');
    var titleEl = document.getElementById('wanda-tv-title');
    var tagEl = document.getElementById('wanda-tv-tagline');
    var progEl = document.getElementById('wanda-progress-badge');
    var markBtn = document.getElementById('wanda-mark-btn');
    var gridEl = document.getElementById('wanda-episodes-grid');

    if (eraEl) eraEl.textContent = epObj.era.toUpperCase();
    if (titleEl) titleEl.textContent = epObj.title;
    if (tagEl) tagEl.textContent = epObj.tagline;

    var isCurrentWatched = state.wanda.watchedEps.indexOf(epObj.ep) !== -1;
    if (markBtn) {
      markBtn.textContent = isCurrentWatched ? '✅ Ep ' + epObj.ep + ' Watched' : '✓ Mark Watched';
    }
    if (progEl) {
      progEl.textContent = state.wanda.watchedEps.length + ' / ' + WANDAVISION_EPISODES.length + ' Watched';
    }

    if (!gridEl) return;
    gridEl.innerHTML = '';

    WANDAVISION_EPISODES.forEach(function (item) {
      var watched = state.wanda.watchedEps.indexOf(item.ep) !== -1;
      var active = state.wanda.currentEp === item.ep;
      var pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'episode-chip' + (watched ? ' is-watched' : '') + (active ? ' is-selected' : '');
      pill.setAttribute('aria-pressed', watched ? 'true' : 'false');
      pill.title = item.title + ' (' + item.era + ')';
      pill.textContent = (watched ? '✓ ' : '') + 'Ep ' + item.ep;
      pill.addEventListener('click', function () {
        state.wanda.currentEp = item.ep;
        saveState(state);
        renderWandaSection(state);
      });
      gridEl.appendChild(pill);
    });
  }

  function bindWandaSection(state) {
    renderWandaSection(state);

    var prevBtn = document.getElementById('wanda-prev-btn');
    var nextBtn = document.getElementById('wanda-next-btn');
    var markBtn = document.getElementById('wanda-mark-btn');

    if (prevBtn && !prevBtn.dataset.bound) {
      prevBtn.dataset.bound = '1';
      prevBtn.addEventListener('click', function () {
        state.wanda.currentEp = state.wanda.currentEp <= 1 ? 9 : state.wanda.currentEp - 1;
        saveState(state);
        renderWandaSection(state);
      });
    }

    if (nextBtn && !nextBtn.dataset.bound) {
      nextBtn.dataset.bound = '1';
      nextBtn.addEventListener('click', function () {
        state.wanda.currentEp = state.wanda.currentEp >= 9 ? 1 : state.wanda.currentEp + 1;
        saveState(state);
        renderWandaSection(state);
      });
    }

    if (markBtn && !markBtn.dataset.bound) {
      markBtn.dataset.bound = '1';
      markBtn.addEventListener('click', function () {
        var ep = state.wanda.currentEp;
        var idx = state.wanda.watchedEps.indexOf(ep);
        if (idx === -1) {
          state.wanda.watchedEps.push(ep);
        } else {
          state.wanda.watchedEps.splice(idx, 1);
        }
        saveState(state);
        renderWandaSection(state);
      });
    }
  }

  /* ---------- Section 3: Subnautica Alarms + .ics + Web Audio ---------- */
  function formatTime12h(hhmm) {
    if (!hhmm || hhmm.indexOf(':') === -1) return hhmm;
    var parts = hhmm.split(':');
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    var suffix = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return h12 + ':' + m + ' ' + suffix;
  }

  function getNextAlarmSummary(alarms) {
    var armed = alarms.filter(function (a) { return a.armed && a.time; });
    if (!armed.length) return '0 Armed — Arm one now!';
    var now = new Date();
    var bestDiff = Infinity;
    var bestAlarm = armed[0];

    armed.forEach(function (alarm) {
      var parts = alarm.time.split(':');
      var target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(parts[0], 10), parseInt(parts[1], 10), 0);
      if (target.getTime() <= now.getTime()) {
        target.setDate(target.getDate() + 1);
      }
      var diff = target.getTime() - now.getTime();
      if (diff < bestDiff) {
        bestDiff = diff;
        bestAlarm = alarm;
      }
    });

    var totalMins = Math.max(1, Math.round(bestDiff / 60000));
    var hrs = Math.floor(totalMins / 60);
    var mins = totalMins % 60;
    var eta = hrs > 0 ? (hrs + 'h ' + mins + 'm') : (mins + 'm');
    return armed.length + ' Armed • Next: ' + formatTime12h(bestAlarm.time) + ' (' + eta + ')';
  }

  function renderSubnauticaSection(state) {
    var listEl = document.getElementById('alarm-list');
    var prepEl = document.getElementById('subnautica-prep-list');
    var badgeEl = document.getElementById('alarm-countdown-badge');
    var topCountEl = document.getElementById('top-banner-alarm-count');

    var armedCount = state.subnautica.alarms.filter(function (a) { return a.armed; }).length;
    if (badgeEl) {
      badgeEl.textContent = getNextAlarmSummary(state.subnautica.alarms);
    }
    if (topCountEl) {
      topCountEl.textContent = armedCount + (armedCount === 1 ? ' alarm armed' : ' alarms armed');
    }

    if (listEl) {
      listEl.innerHTML = '';
      state.subnautica.alarms.forEach(function (alarm) {
        var li = document.createElement('li');
        li.className = 'alarm-item' + (alarm.armed ? ' is-armed' : '');

        var timeBadge = document.createElement('span');
        timeBadge.className = 'alarm-time-badge';
        timeBadge.textContent = (alarm.armed ? '🔔 ' : '🔕 ') + formatTime12h(alarm.time);

        var toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'checklist-toggle-btn';
        toggleBtn.setAttribute('aria-pressed', alarm.armed ? 'true' : 'false');
        toggleBtn.textContent = alarm.label + (alarm.armed ? ' (Armed)' : ' (Paused)');
        toggleBtn.addEventListener('click', function () {
          alarm.armed = !alarm.armed;
          saveState(state);
          renderSubnauticaSection(state);
        });

        var rmBtn = document.createElement('button');
        rmBtn.type = 'button';
        rmBtn.className = 'mini-btn';
        rmBtn.setAttribute('aria-label', 'Delete alarm ' + alarm.label);
        rmBtn.textContent = '✕';
        rmBtn.addEventListener('click', function () {
          state.subnautica.alarms = state.subnautica.alarms.filter(function (a) { return a.id !== alarm.id; });
          saveState(state);
          renderSubnauticaSection(state);
        });

        li.appendChild(timeBadge);
        li.appendChild(toggleBtn);
        li.appendChild(rmBtn);
        listEl.appendChild(li);
      });
    }

    if (prepEl) {
      prepEl.innerHTML = '';
      DEFAULT_PREP_ITEMS.forEach(function (item) {
        var done = state.subnautica.prepDone.indexOf(item.id) !== -1;
        var li = document.createElement('li');
        li.className = 'watchlist-item' + (done ? ' is-done' : '');

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'checklist-toggle-btn';
        btn.setAttribute('aria-pressed', done ? 'true' : 'false');
        btn.textContent = (done ? '☑ ' : '☐ ') + item.text;
        btn.addEventListener('click', function () {
          var idx = state.subnautica.prepDone.indexOf(item.id);
          if (idx === -1) {
            state.subnautica.prepDone.push(item.id);
          } else {
            state.subnautica.prepDone.splice(idx, 1);
          }
          saveState(state);
          renderSubnauticaSection(state);
        });

        li.appendChild(btn);
        prepEl.appendChild(li);
      });
    }
  }

  function pad2(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatIcsLocalDateTime(dateObj) {
    return (
      dateObj.getFullYear() +
      pad2(dateObj.getMonth() + 1) +
      pad2(dateObj.getDate()) +
      'T' +
      pad2(dateObj.getHours()) +
      pad2(dateObj.getMinutes()) +
      '00'
    );
  }

  function escapeIcsText(str) {
    return String(str || '')
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }

  function downloadSubnauticaIcs(state) {
    var alarms = state.subnautica.alarms.filter(function (a) { return a.armed; });
    if (!alarms.length) alarms = state.subnautica.alarms;
    if (!alarms.length) {
      alarms = [{ id: 'fallback', time: '21:00', label: 'Watch Subnautica Gameplay!', armed: true }];
    }

    var now = new Date();
    var stamp = formatIcsLocalDateTime(now);
    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Harveys Chicken Date Plan//Subnautica Alarms//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    alarms.forEach(function (alarm, idx) {
      var parts = (alarm.time || '21:00').split(':');
      var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(parts[0], 10) || 21, parseInt(parts[1], 10) || 0, 0);
      if (start.getTime() <= now.getTime()) {
        start.setDate(start.getDate() + 1);
      }
      var end = new Date(start.getTime() + 60 * 60000);

      lines.push('BEGIN:VEVENT');
      lines.push('UID:subnautica-alarm-' + idx + '-' + now.getTime() + '@harveys-date-plan');
      lines.push('DTSTAMP:' + stamp);
      lines.push('DTSTART:' + formatIcsLocalDateTime(start));
      lines.push('DTEND:' + formatIcsLocalDateTime(end));
      lines.push('SUMMARY:' + escapeIcsText('SUBNAUTICA ALARM: ' + alarm.label));
      lines.push('DESCRIPTION:' + escapeIcsText("Harvey's Date Plan Reminder: Do NOT miss watching Subnautica gameplay!"));
      lines.push('BEGIN:VALARM');
      lines.push('ACTION:DISPLAY');
      lines.push('DESCRIPTION:' + escapeIcsText('Time for Subnautica gameplay!'));
      lines.push('TRIGGER:-PT0M');
      lines.push('END:VALARM');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    var icsContent = lines.join('\r\n');
    var blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'subnautica-gameplay-alarms.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1500);
  }

  function triggerAlarmRingVisual() {
    var slot = document.getElementById('subnautica-chicken-slot');
    var section = document.getElementById('subnautica-alarms');
    if (slot) {
      slot.classList.remove('is-ringing');
      void slot.offsetWidth;
      slot.classList.add('is-ringing');
    }
    if (section) {
      section.classList.remove('is-ringing');
      void section.offsetWidth;
      section.classList.add('is-ringing');
    }
    window.setTimeout(function () {
      if (slot) slot.classList.remove('is-ringing');
      if (section) section.classList.remove('is-ringing');
    }, 1600);
  }

  function bindSubnauticaSection(state) {
    renderSubnauticaSection(state);

    var form = document.getElementById('alarm-add-form');
    var timeInput = document.getElementById('alarm-time-input');
    var labelInput = document.getElementById('alarm-label-input');
    var feedbackEl = document.getElementById('alarm-feedback-msg');

    if (form && timeInput && labelInput && !form.dataset.bound) {
      form.dataset.bound = '1';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var t = timeInput.value || '21:00';
        var lbl = labelInput.value.trim() || 'Watch Subnautica Gameplay!';
        state.subnautica.alarms.push({
          id: 'al-' + Date.now(),
          time: t,
          label: lbl,
          armed: true
        });
        labelInput.value = '';
        saveState(state);
        renderSubnauticaSection(state);
        if (feedbackEl) {
          feedbackEl.textContent = 'Alarm armed for ' + formatTime12h(t) + ': ' + lbl;
        }
      });
    }

    var icsBtn = document.getElementById('download-ics-btn');
    if (icsBtn && !icsBtn.dataset.bound) {
      icsBtn.dataset.bound = '1';
      icsBtn.addEventListener('click', function () {
        downloadSubnauticaIcs(state);
        if (feedbackEl) {
          feedbackEl.textContent = 'Downloaded subnautica-gameplay-alarms.ics! Open it to add reminders to your calendar.';
        }
      });
    }

    var chimeBtn = document.getElementById('test-alarm-audio-btn');
    if (chimeBtn && !chimeBtn.dataset.bound) {
      chimeBtn.dataset.bound = '1';
      chimeBtn.addEventListener('click', function () {
        playCartoonAlarmChime();
        triggerAlarmRingVisual();
        if (feedbackEl) {
          feedbackEl.textContent = 'COCK-A-DOODLE-DOO!! Subnautica rooster alarm clucking loud & clear!';
        }
      });
    }

    window.setInterval(function () {
      var badgeEl = document.getElementById('alarm-countdown-badge');
      if (badgeEl) {
        badgeEl.textContent = getNextAlarmSummary(state.subnautica.alarms);
      }
      var now = new Date();
      var hhmm = pad2(now.getHours()) + ':' + pad2(now.getMinutes());
      var minuteKey = now.toDateString() + ' ' + hhmm;
      if (minuteKey !== lastTriggeredMinute) {
        var matching = state.subnautica.alarms.filter(function (a) { return a.armed && a.time === hhmm; });
        if (matching.length) {
          lastTriggeredMinute = minuteKey;
          playCartoonAlarmChime();
          triggerAlarmRingVisual();
          if (feedbackEl) {
            feedbackEl.textContent = 'ALARM GOING OFF NOW: ' + matching[0].label;
          }
        }
      }
    }, 15000);
  }

  /* ---------- Section 4: Master Date Timeline ---------- */
  function renderTimeline(state) {
    var container = document.getElementById('timeline-steps');
    var progressEl = document.getElementById('timeline-progress-text');
    if (!container) return;

    if (progressEl) {
      progressEl.textContent = state.timelineDone.length + ' / ' + TIMELINE_QUESTS.length + ' Quests Done';
    }

    container.innerHTML = '';
    TIMELINE_QUESTS.forEach(function (q) {
      var done = state.timelineDone.indexOf(q.id) !== -1;
      var li = document.createElement('li');
      li.className = 'timeline-step' + (done ? ' is-done' : '');

      var num = document.createElement('span');
      num.className = 'timeline-step-num';
      num.textContent = done ? '✓' : String(q.step);

      var phase = document.createElement('span');
      phase.className = 'timeline-step-time';
      phase.textContent = q.phase;

      var titleLink = document.createElement('a');
      titleLink.style.fontWeight = '800';
      titleLink.style.fontSize = '1.03rem';
      titleLink.style.textDecoration = 'none';
      titleLink.href = q.target;
      titleLink.textContent = q.title;

      var desc = document.createElement('p');
      desc.style.fontSize = '0.9rem';
      desc.style.margin = '0 0 0.5rem';
      desc.textContent = q.desc;

      var toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'mini-btn' + (done ? ' is-selected' : '');
      toggleBtn.style.marginTop = 'auto';
      toggleBtn.style.alignSelf = 'flex-start';
      toggleBtn.setAttribute('aria-pressed', done ? 'true' : 'false');
      toggleBtn.textContent = done ? 'Completed ✓' : 'Check Off';
      toggleBtn.addEventListener('click', function () {
        var idx = state.timelineDone.indexOf(q.id);
        if (idx === -1) {
          state.timelineDone.push(q.id);
          if (state.timelineDone.length === TIMELINE_QUESTS.length) {
            playCluckSound();
            launchConfetti(toggleBtn);
          }
        } else {
          state.timelineDone.splice(idx, 1);
        }
        saveState(state);
        renderTimeline(state);
      });

      li.appendChild(num);
      li.appendChild(phase);
      li.appendChild(titleLink);
      li.appendChild(desc);
      li.appendChild(toggleBtn);
      container.appendChild(li);
    });
  }

  /* ---------- Footer Buttons ---------- */
  function bindFooter(menu, state) {
    var cluckBtn = document.getElementById('cluck-confetti-btn');
    var punEl = document.getElementById('footer-pun-text');
    var punIndex = 0;

    if (cluckBtn && !cluckBtn.dataset.bound) {
      cluckBtn.dataset.bound = '1';
      cluckBtn.addEventListener('click', function () {
        playCluckSound();
        launchConfetti(cluckBtn);
        punIndex = (punIndex + 1) % CHICKEN_PUNS.length;
        if (punEl) punEl.textContent = CHICKEN_PUNS[punIndex];
      });
    }

    var resetBtn = document.getElementById('reset-all-btn');
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.dataset.bound = '1';
      resetBtn.addEventListener('click', function () {
        try {
          if (window.localStorage) window.localStorage.removeItem(STORAGE_KEY);
        } catch (err) {
          // ignore
        }
        var fresh = createInitialState(menu);
        Object.keys(fresh).forEach(function (k) {
          state[k] = fresh[k];
        });
        saveState(state);
        bindMealSection(menu, state);
        renderFnafSection(state);
        renderYoutubeSection(state);
        renderWandaSection(state);
        renderSubnauticaSection(state);
        renderTimeline(state);
      });
    }
  }

  /* ---------- Boot ---------- */
  function init() {
    var menu = getMenuData();
    var state = loadState(menu);

    warmChickenAudioCache();
    mountAllStaticChickens();
    bindMealSection(menu, state);
    bindFnafSection(state);
    bindYoutubeSection(state);
    bindWandaSection(state);
    bindSubnauticaSection(state);
    renderTimeline(state);
    bindFooter(menu, state);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
