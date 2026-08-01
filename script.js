// FAQ — um item aberto por vez (Fase 3, seção 7)
document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));

    document.querySelectorAll('.accordion-trigger[aria-expanded="true"]').forEach((other) => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        document.getElementById(other.getAttribute('aria-controls')).hidden = true;
      }
    });

    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

// Menu mobile — hambúrguer acessível (fecha por item, clique fora e ESC)
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.getElementById('nav-list');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navList.classList.remove('is-open');
}
function openMenu() {
  menuToggle.setAttribute('aria-expanded', 'true');
  navList.classList.add('is-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

navList.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Motion — fade + deslocamento ao entrar no viewport (Fase 3, seção 10)
// Stagger leve entre irmãos da mesma seção (100-120ms), conforme Motion Map da Fase 2.5
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
