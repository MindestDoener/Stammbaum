import { Injectable } from '@angular/core';
import { Theme } from './types/theme';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  theme: Theme = Theme.LIGHT;

  constructor() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // checks for browser dark mode preference
      // this.setTheme(Theme.DARK)
    }
  }

  toggleTheme(): Theme {
    this.setTheme(this.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
    return this.theme;
  }

  setTheme(theme: Theme): void {
    this.theme = theme
    document.documentElement.style.setProperty('--bg', `var(--bg--${this.theme.name})`)
    document.documentElement.style.setProperty('--bg-a', `var(--bg-a-${this.theme.name})`)
    document.documentElement.style.setProperty('--text', `var(--text--${this.theme.name})`)
    document.documentElement.style.setProperty('--text-secondary', `var(--text-secondary--${this.theme.name})`)
    document.documentElement.style.setProperty('--hover', `var(--hover--${this.theme.name})`)
    document.documentElement.style.setProperty('--primary', `var(--primary--${this.theme.name})`)
    document.documentElement.style.setProperty('--secondary', `var(--secondary--${this.theme.name})`)
  }

}
