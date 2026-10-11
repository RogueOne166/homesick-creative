/* Navigation and theme for Events. Uses the homepage's homesick-theme key.
   Do not load site.js here: it also expects the homepage booking form. */
(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const toggle = document.querySelector('.theme-toggle');
  const icon = document.querySelector('.theme-icon');
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('homesick-theme'); } catch (_) { /* Use device theme if storage is blocked. */ }
  const applyTheme = dark => {
    document.body.classList.toggle('dark-mode', dark);
    icon.textContent = dark ? '☀' : '☾';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', String(dark));
  };
  applyTheme(savedTheme === 'dark' || (!savedTheme && deviceTheme.matches));
  toggle.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-mode');
    savedTheme = dark ? 'dark' : 'light';
    applyTheme(dark);
    try { localStorage.setItem('homesick-theme', savedTheme); } catch (_) { /* Theme still works for this visit. */ }
  });
  deviceTheme.addEventListener('change', event => { if (!savedTheme) applyTheme(event.matches); });
  window.addEventListener('storage', event => {
    if (event.key === 'homesick-theme') { savedTheme = event.newValue; applyTheme(savedTheme === 'dark' || (!savedTheme && deviceTheme.matches)); }
  });
})();

/* Step 4 — Display-only ticket subtotal. The payment server must enforce
   the real price and availability when checkout is added. */
(() => {
  const quantity = document.querySelector('#ticket-quantity');
  const total = document.querySelector('#ticket-total');
  if (!quantity || !total) return; // The Events listing has no selector.
  const regularPriceCents = 800;
  const currency = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
  function updateSubtotal() {
    const count = Number(quantity.value);
    if (!Number.isInteger(count) || count < 1 || count > 10) {
      quantity.value = '1';
    }
    total.textContent = currency.format(regularPriceCents * Number(quantity.value) / 100);
  }
  quantity.addEventListener('change', updateSubtotal);
  updateSubtotal();
})();
