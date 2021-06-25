import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {

  moveBg = (event: MouseEvent) => {
    const outer = document.getElementById("outer");
    if (outer) {
      outer.style.backgroundPositionX = (window.innerWidth / 5) - event.pageX / 10 + "px";
      outer.style.backgroundPositionY = (window.innerHeight / 6) - event.pageY / 10 + "px";
    }
  }
}
