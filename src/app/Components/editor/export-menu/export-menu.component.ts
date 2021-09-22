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

  loading = false;

  @Input()
  familyTree!: FamilyTree;

  constructor(public activeModal: NgbActiveModal) {
  }

  exportJSON(): void {
    const blob = FamilyTreeService.tree2Blob(this.familyTree);
    saveAs(blob, this.familyTree.name + '.json');
  }

  exportPNG(): void {
    this.loading = true;
    // tslint:disable-next-line:no-non-null-assertion
    const graph = document.getElementById('tree-graph')!.firstChild!.firstChild;
    if (graph) {
      html2canvas(graph as HTMLElement)
        .then((canvas) => {
          saveAs(canvas.toDataURL(), this.familyTree.name + '.png');
          this.loading = false;
        });
    }
  }
}
