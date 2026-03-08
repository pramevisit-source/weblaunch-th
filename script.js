/* ─── SCRIPT.JS ─── */

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── TYPING ANIMATION ───
const codeLines = [
  '<!DOCTYPE html>',
  '<html lang="th">',
  '<head>',
  '  <title>เว็บไซต์แรก 🚀</title>',
  '</head>',
  '<body>',
  '  <h1>สวัสดีโลก!</h1>',
  '  <p>เว็บของฉัน Live แล้ว ✨</p>',
  '</body>',
  '</html>',
];

const typedCode = document.getElementById('typedCode');
let lineIdx = 0;
let charIdx = 0;
let currentText = '';
let isDeleting = false;
let pauseTimer = null;

function typeCode() {
  if (lineIdx >= codeLines.length) {
    // Pause then restart
    pauseTimer = setTimeout(() => {
      lineIdx = 0; charIdx = 0; currentText = '';
      typedCode.textContent = '';
      typeCode();
    }, 3000);
    return;
  }

  const fullLine = codeLines[lineIdx];
  if (!isDeleting) {
    if (charIdx <= fullLine.length) {
      currentText = codeLines.slice(0, lineIdx).join('\n') +
        (lineIdx > 0 ? '\n' : '') + fullLine.slice(0, charIdx);
      typedCode.textContent = currentText + (charIdx < fullLine.length ? '▌' : '');
      charIdx++;
      setTimeout(typeCode, charIdx === fullLine.length + 1 ? 300 : 40);
    } else {
      lineIdx++;
      charIdx = 0;
      setTimeout(typeCode, 200);
    }
  }
}
typeCode();

// ─── INTERSECTION OBSERVER (AOS) ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-aos]').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.06}s`;
  observer.observe(el);
});

// ─── FAQ TOGGLE ───
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) item.classList.add('open');
}

// ─── COPY CODE ───
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  const text = pre.innerText;

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ─── SMOOTH ACTIVE NAV ───
const sections = document.querySelectorAll('section[id], header[id]');
const navA = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navA.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });
