import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FamilyTreeService } from 'src/app/shared/family-tree.service';
import { FamilyTree } from 'src/app/shared/types/familyTree';

@Injectable()
export class EditorResolverService implements Resolve<FamilyTree> {
  constructor(
    private router: Router,
    private familyTreeService: FamilyTreeService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FamilyTree> {
      const id = route.paramMap.get('id');
    return (
      id !== undefined && id !== null
        ? this.familyTreeService.getSingleTree(id)
        : throwError('No FamilyTree id provided in route')
    ).pipe(
      tap(
        () => {},
        () => {
            this.router.navigate(['/home']);
        },
      ),
    );
  }
}
