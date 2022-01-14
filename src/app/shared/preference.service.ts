import { Injectable } from '@angular/core';
import { Theme } from './types/theme';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  theme: Theme = Theme.LIGHT;

  toggleTheme(): Theme {
    this.theme = this.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    document.documentElement.style.setProperty('--bg', `var(--bg--${this.theme.name})`)
    document.documentElement.style.setProperty('--text', `var(--text--${this.theme.name})`)
    document.documentElement.style.setProperty('--text-secondary', `var(--text-secondary--${this.theme.name})`)
    document.documentElement.style.setProperty('--primary', `var(--primary--${this.theme.name})`)
    document.documentElement.style.setProperty('--secondary', `var(--secondary--${this.theme.name})`)
    return this.theme;
  }

}
