/* Navigation and theme for standalone Events page. */
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('homesick-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) document.body.classList.add('dark-mode');
function updateThemeButton() {
  const dark = document.body.classList.contains('dark-mode');
  themeIcon.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
updateThemeButton();
themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('homesick-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  updateThemeButton();
});
