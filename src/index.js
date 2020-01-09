import './css/styles.css';
import menues from './json/menu.json';
import menuTemplate from './templates/menu-tamplete.hbs';

const menuItem = {
  jsMenu: document.querySelector('.js-menu'),
};

function buildMenu(menues) {
  const murkup = menues.map(menu => menuTemplate(menu)).join('');
  menuItem.jsMenu.insertAdjacentHTML('beforeend', murkup);
}

buildMenu(menues);

const refs = {
  body: document.querySelector('body'),
  menu: document.querySelector('#menu'),
  themeSwitch: document.querySelector('#theme-switch-control'),
  loc: {
    theme: localStorage.getItem('theme'),
  },
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const lightTheme = tag => {
  tag.classList.remove(Theme.DARK);
  tag.classList.add(Theme.LIGHT);
  localStorage.setItem('theme', Theme.LIGHT);
};
const darkTheme = tag => {
  tag.classList.remove(Theme.LIGHT);
  tag.classList.add(Theme.DARK);
  localStorage.setItem('theme', Theme.DARK);
};
const applyTheme = boolean => {
  boolean ? darkTheme(refs.body) : lightTheme(refs.body);
};

if (refs.loc.theme === Theme.DARK) {
  darkTheme(refs.body);
  refs.themeSwitch.checked = true;
}

refs.body.addEventListener('click', e => {
  if (e.target.nodeName !== 'INPUT') {
    return;
  }
  applyTheme(e.target.checked);
});

