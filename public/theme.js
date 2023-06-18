// theme.js
const themeButton = document.createElement('button');
themeButton.classList.add('theme-button');
themeButton.textContent = 'Toggle Theme';
document.body.appendChild(themeButton);

// Toggle theme on button click
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Check if theme preference is stored in local storage
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  document.body.classList.add(storedTheme);
}
