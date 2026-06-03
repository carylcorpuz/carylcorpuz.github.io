/* ============================================
   DASHMIND CARYL — Portfolio JavaScript
   script.js
   ============================================ */

/* ── CUSTOM CURSOR ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '50px';
    ring.style.height      = '50px';
    ring.style.borderColor = 'rgba(196,149,106,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width       = '32px';
    ring.style.height      = '32px';
    ring.style.borderColor = 'rgba(196,149,106,0.5)';
  });
});

/* ── SCROLL REVEAL + SKILL BAR ANIMATION ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('visible');

    // Animate skill bars inside revealed cards
    entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
      const width = bar.getAttribute('data-w') || '0.8';
      setTimeout(() => {
        bar.style.transform = `scaleX(${width})`;
        bar.classList.add('animate');
      }, 200 + i * 80);
    });

    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── FLOATING DANDELION SEEDS ── */
const seedsContainer = document.getElementById('seedsContainer');

for (let i = 0; i < 22; i++) {
  const seed = document.createElement('div');
  seed.className = 'seed';
  seed.style.cssText = `
    left: ${Math.random() * 100}%;
    --twist: ${(Math.random() - 0.5) * 200}deg;
    animation-duration: ${9 + Math.random() * 14}s;
    animation-delay: ${Math.random() * 16}s;
    width: ${1.5 + Math.random() * 2}px;
    height: ${1.5 + Math.random() * 2}px;
  `;
  seedsContainer.appendChild(seed);
}

/* ── THEME TOGGLE (Dark / Light) ── */
const toggleBtn   = document.getElementById('themeToggle');
const toggleLabel = document.getElementById('toggleLabel');
const htmlEl      = document.documentElement;

// Restore saved preference on load
if (localStorage.getItem('dmc-theme') === 'light') {
  htmlEl.classList.add('light');
  toggleLabel.textContent = 'Light';
}

toggleBtn.addEventListener('click', () => {
  const isLight = htmlEl.classList.toggle('light');
  toggleLabel.textContent = isLight ? 'Light' : 'Dark';
  localStorage.setItem('dmc-theme', isLight ? 'light' : 'dark');
});

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 220) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});