import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false); // Default to dark mode

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.isDarkMode.set(prefersDark);
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    this.applyTheme();
  }

  private applyTheme() {
    const theme = this.isDarkMode() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
