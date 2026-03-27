import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';

  constructor() { }

  initTheme() {
    const savedTheme = sessionStorage.getItem(this.themeKey) || 'light';
    this.setTheme(savedTheme);
  }

  toggleTheme() {
    const currentTheme = sessionStorage.getItem(this.themeKey) || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }

  setTheme(theme: string) {
    sessionStorage.setItem(this.themeKey, theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  getTheme() {
    return sessionStorage.getItem(this.themeKey) || 'light';
  }
}
