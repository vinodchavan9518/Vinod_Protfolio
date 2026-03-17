/* ================================================
   VISHAL DESHMUKH — PORTFOLIO
   script.js
   ================================================ */

/* -----------------------------------------------
   1. PRELOADER
----------------------------------------------- */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('preFill');
  const pct       = document.getElementById('prePct');
  let progress    = 0;

  const interval = setInterval(function () {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 400);
    }
    fill.style.width   = progress + '%';
    pct.textContent    = Math.floor(progress) + '%';
  }, 80);
})();


/* -----------------------------------------------
   2. CUSTOM CURSOR
----------------------------------------------- */
(function initCursor() {
  const dot    = document.getElementById('cursorDot');
  const circle = document.getElementById('cursorCircle');
  let mouseX = 0, mouseY = 0;
  let circX  = 0, circY  = 0;

  // Move dot instantly
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth follow for circle
  (function animateCircle() {
    circX += (mouseX - circX) * 0.1;
    circY += (mouseY - circY) * 0.1;
    circle.style.left = circX + 'px';
    circle.style.top  = circY + 'px';
    requestAnimationFrame(animateCircle);
  })();

  // Hover effects
  var hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-item');
  hoverTargets.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      circle.style.width       = '54px';
      circle.style.height      = '54px';
      circle.style.borderColor = 'rgba(245, 158, 11, 0.6)';
      circle.style.opacity     = '0.5';
    });
    el.addEventListener('mouseleave', function () {
      circle.style.width       = '34px';
      circle.style.height      = '34px';
      circle.style.borderColor = 'rgba(124, 58, 237, 0.5)';
      circle.style.opacity     = '1';
    });
  });
})();


/* -----------------------------------------------
   3. STICKY HEADER
----------------------------------------------- */
(function initHeader() {
  var header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });
})();


/* -----------------------------------------------
   4. MOBILE HAMBURGER MENU
----------------------------------------------- */
(function initHamburger() {
  var menuBtn = document.getElementById('menuBtn');
  var navMenu = document.getElementById('navMenu');

  menuBtn.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    var spans  = menuBtn.querySelectorAll('span');

    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  var navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      var spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
})();


/* -----------------------------------------------
   5. SMOOTH SCROLL
----------------------------------------------- */
(function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = anchor.getAttribute('href');
      var target   = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


/* -----------------------------------------------
   6. ACTIVE NAV LINK ON SCROLL
----------------------------------------------- */
function updateActiveNavLink() {
  var sections  = document.querySelectorAll('section[id]');
  var scrollPos = window.scrollY + 130;

  sections.forEach(function (section) {
    var sectionTop    = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId     = section.getAttribute('id');
    var link          = document.querySelector('.nav-link[href="#' + sectionId + '"]');

    if (link) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(function (l) {
          l.classList.remove('active');
        });
        link.classList.add('active');
      }
    }
  });
}

// Run once on load
updateActiveNavLink();


/* -----------------------------------------------
   7. TYPING EFFECT
----------------------------------------------- */
(function initTyping() {
  var typedEl = document.getElementById('typedText');
  if (!typedEl) return;

  var roles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Java Developer',
    'JSP & Servlet Expert',
    'Web Designer'
  ];

  var roleIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function typeLoop() {
    var currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, 350);
        return;
      }
      setTimeout(typeLoop, 55);
    } else {
      typedEl.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
      setTimeout(typeLoop, 95);
    }
  }

  setTimeout(typeLoop, 1000);
})();


/* -----------------------------------------------
   8. PARTICLE CANVAS BACKGROUND
----------------------------------------------- */
(function initParticles() {
  var canvas = document.getElementById('canvas');
  if (!canvas) return;

  var ctx    = canvas.getContext('2d');
  var W, H;
  var particles = [];
  var COUNT = 65;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r:  Math.random() * 1.5 + 0.5
      });
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    // Update & draw dots
    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 58, 237, 0.5)';
      ctx.fill();
    });

    // Draw connecting lines
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx   = particles[i].x - particles[j].x;
        var dy   = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(124, 58, 237, ' + (0.12 * (1 - dist / 110)) + ')';
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawFrame);
  }

  window.addEventListener('resize', resize);
  resize();
  drawFrame();
})();


/* -----------------------------------------------
   9. HERO COUNTER ANIMATION
----------------------------------------------- */
(function initCounters() {
  var countersRun = false;
  var statsBox    = document.querySelector('.hero-stats');
  if (!statsBox) return;

  function runCounters() {
    var numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(function (el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1500;
      var steps    = target / (duration / 16);
      var current  = 0;

      var timer = setInterval(function () {
        current += steps;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + '+';
      }, 16);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !countersRun) {
      countersRun = true;
      runCounters();
    }
  }, { threshold: 0.5 });

  observer.observe(statsBox);
})();


/* -----------------------------------------------
   10. SCROLL REVEAL ANIMATION
----------------------------------------------- */
(function initScrollReveal() {
  var reveals = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();


/* -----------------------------------------------
   11. SKILL BAR ANIMATION
----------------------------------------------- */
(function initSkillBars() {
  var skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  var animated = false;

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      var bars = document.querySelectorAll('.skill-bar-fill');
      bars.forEach(function (bar) {
        var width = bar.getAttribute('data-width');
        setTimeout(function () {
          bar.style.width = width + '%';
        }, 200);
      });
    }
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
})();


/* -----------------------------------------------
   12. PARALLAX GLOW BLOBS ON MOUSEMOVE
----------------------------------------------- */
(function initParallax() {
  document.addEventListener('mousemove', function (e) {
    var xFrac = (e.clientX / window.innerWidth  - 0.5) * 28;
    var yFrac = (e.clientY / window.innerHeight - 0.5) * 28;

    var glows = document.querySelectorAll('.hero-glow');
    glows.forEach(function (glow, index) {
      var factor = (index + 1) * 0.38;
      glow.style.transform = 'translate(' + (xFrac * factor) + 'px, ' + (yFrac * factor) + 'px)';
    });
  });
})();


/* -----------------------------------------------
   13. CONTACT FORM SUBMIT
----------------------------------------------- */
(function initContactForm() {
  var form       = document.getElementById('contactForm');
  var successMsg = document.getElementById('successMsg');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var submitBtn  = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled   = true;

    // Simulate sending (replace with real API call / EmailJS / Formspree)
    setTimeout(function () {
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      submitBtn.disabled  = false;
      successMsg.classList.add('visible');
      form.reset();

      setTimeout(function () {
        successMsg.classList.remove('visible');
      }, 5000);
    }, 1600);
  });
})();


/* -----------------------------------------------
   14. CONSOLE GREETING
----------------------------------------------- */
console.log('%c👋 Hi! I\'m Vishal Deshmukh — Full Stack Developer', 'color:#7c3aed; font-size:16px; font-weight:700;');
console.log('%cBCA Student · Badrinarayan Barwale Mahavidyalaya, Jalna, Maharashtra', 'color:#94a3b8; font-size:12px;');
console.log('%cPortfolio: https://vishaldeshmukh18protfolio.netlify.app/', 'color:#f59e0b; font-size:12px;');
