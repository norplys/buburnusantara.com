import { menuButtons, menuCategories } from '../lib/elements';
import type { Menu } from '../lib/types/menu';

const cachedCurrentMenu = localStorage.getItem('currentMenu') as Menu;

let currentMenu: Menu = cachedCurrentMenu ?? 'breakfast';
let prevMenu: Menu;

highlightMenuButton(currentMenu);
toggleMenuCategory(currentMenu);

menuButtons.forEach((menuButton) => {
  const menuId = menuButton.id as Menu;
  menuButton.addEventListener('click', handleChangeMenu(menuId));
});

function handleChangeMenu(menuId: Menu) {
  return (): void => {
    if (currentMenu === menuId) return;

    prevMenu = currentMenu;
    currentMenu = menuId;

    localStorage.setItem('currentMenu', currentMenu);

    highlightMenuButton(menuId);
    toggleMenuCategory(menuId);
  };
}

function highlightMenuButton(menuId: Menu): void {
  menuButtons.forEach((menuButton) => {
    const menuButtonId = menuButton.id as Menu;
    if (menuButtonId === menuId) menuButton.classList.add('active');
    else menuButton.classList.remove('active');
  });
}

function toggleMenuCategory(menuId: Menu): void {
  menuCategories.forEach((menuCategory) => {
    const menuCategoryId = menuCategory.id as Menu;

    if (menuCategoryId === menuId) {
      if (!prevMenu) menuCategory.style.display = '';
      setTimeout(() => {
        menuCategory.style.display = '';
        setTimeout(() => menuCategory.classList.add('show'), 100);
      }, 500);
    } else if (prevMenu === menuCategoryId) {
      menuCategory.classList.remove('show');
      setTimeout(() => (menuCategory.style.display = 'none'), 500);
    } else {
      menuCategory.classList.remove('show');
      menuCategory.style.display = 'none';
    }
  });
}
