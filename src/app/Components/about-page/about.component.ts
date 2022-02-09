import { Component, OnInit } from '@angular/core';
import { PreferenceService } from 'src/app/shared/preference.service';
import { Theme } from '../../shared/types/theme';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private pref: PreferenceService) {
  }

  getPicPath(): string {
    return this.pref.theme === Theme.LIGHT ? '../../../assets/img/TeamLight.svg' : '../../../assets/img/TeamDark.svg'
  }

  ngOnInit(): void {
  }

}
