// === Pot-Bouille / Накипь — minimal JS: lang switch + reveal on scroll ===

(function () {
  const root = document.documentElement;

  const SUPPORTED = ['fr', 'ru', 'en'];
  const stored = localStorage.getItem('nakip-lang');
  if (stored && SUPPORTED.includes(stored)) root.setAttribute('data-lang', stored);

  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-set-lang');
      root.setAttribute('data-lang', lang);
      localStorage.setItem('nakip-lang', lang);
      root.setAttribute('lang', lang);
      updateActive(lang);
    });
  });

  function updateActive(lang) {
    document.querySelectorAll('[data-set-lang]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });
  }
  updateActive(root.getAttribute('data-lang'));

  const targets = document.querySelectorAll(
    '.preface .frame, .preface .title, .preface .subtitle, .preface .epigraph, .chapter, footer'
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );
  targets.forEach((t) => io.observe(t));

  const hint = document.querySelector('.scroll-hint');
  if (hint) {
    hint.addEventListener('click', () => {
      const first = document.getElementById('roman');
      if (first) first.scrollIntoView({ behavior: 'smooth' });
    });
    hint.style.cursor = 'pointer';
  }
})();
