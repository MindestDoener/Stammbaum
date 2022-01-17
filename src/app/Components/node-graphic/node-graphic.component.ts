import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-graphic',
  templateUrl: './node-graphic.component.html',
  styleUrls: ['./node-graphic.component.scss']
})
export class NodeGraphicComponent implements OnInit{

  @Input()
  initColor: 'secondary' | 'primary' = 'primary';

  @Input()
  colorChange = true;

  color: 'secondary' | 'primary' = 'primary'

  changeColor(): void {
    if (this.colorChange) {
      this.color = this.color === 'primary' ? 'secondary' : 'primary'
    }
  }

  ngOnInit(): void {
    this.color = this.initColor;
  }

}
