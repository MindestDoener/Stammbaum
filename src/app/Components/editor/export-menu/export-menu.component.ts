import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.scss'],
})
export class ExportMenuComponent {
  loading = false;

  constructor(public activeModal: NgbActiveModal) {
  }

  exportJSON(): void {
    // bla bla
  }

  exportPNG(): void {
    this.loading = true;
    html2canvas(document.getElementById('tree-graph') as HTMLElement)
      .then((canvas) => {
        saveAs(canvas.toDataURL(), 'Stammbaum.png');
        this.loading = false;
      });
  }
}
