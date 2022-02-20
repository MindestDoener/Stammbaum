import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { FamilyTreeService } from './shared/family-tree.service';
import { FamilyTree } from './shared/types/familyTree';
import { SortMode } from './shared/types/sortMode';
import { AuthService } from './shared/auth.service';
import { PreferenceService } from './shared/preference.service';
import { Theme } from './shared/types/theme';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stammbaum-app';
  language = 'en';
  treeList$: Observable<FamilyTree[]>;

  constructor(private familyTreeService: FamilyTreeService, public auth: AuthService, private pref: PreferenceService, private translate: TranslateService) {
    this.treeList$ = new Observable<FamilyTree[]>();
    this.getTrees();
    translate.setDefaultLang(this.language);
  }

  toggleTheme(): void {
    this.pref.toggleTheme();
  }

  getThemeIcon(): string {
    return this.pref.theme === Theme.LIGHT ? 'moon' : 'sun'
  }

  getTrees():void {
    if (this.auth.isAuthenticated()) {
      this.treeList$ = this.familyTreeService.getTreeListSorted(SortMode.lastChanged).pipe(map(treeList => treeList.slice(0,5)));
    }
  }
  toggleLanguage(): void{
    this.language = this.language === 'en' ? 'de' : 'en';
    this.translate.use(this.language);
  }
  getLanguage(): string {
    return this.language;
  }


}
