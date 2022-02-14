import { Component, OnInit } from '@angular/core';
import { PreferenceService } from '../shared/preference.service';
import { Theme } from '../shared/types/theme';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private pref: PreferenceService) { }

  getPicPath(): string {
    return this.pref.theme === Theme.LIGHT ? '../../../assets/img/TeamLight.svg' : '../../../assets/img/TeamDark.svg'
  }

  ngOnInit(): void {
  }

}
