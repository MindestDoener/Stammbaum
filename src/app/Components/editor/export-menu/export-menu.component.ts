import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { FamilyTree } from '../../../shared/types/familyTree';
import { FamilyTreeService } from '../../../shared/family-tree.service';

@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.scss'],
})
export class ExportMenuComponent {

  constructor(public activeModal: NgbActiveModal) {
  }
  loading = false;

  @Input()
  familyTree!: FamilyTree;



  exportJSON(): void {
    const blob = FamilyTreeService.tree2Blob(this.familyTree);
    saveAs(blob, this.familyTree.name + '.json');
  }

  exportPNG(): void { // fixme
    this.loading = true;
    html2canvas(document.getElementById('tree-graph') as HTMLElement)
      .then((canvas) => {
        saveAs(canvas.toDataURL(), this.familyTree.name + '.png');
        this.loading = false;
      });
  }
}
