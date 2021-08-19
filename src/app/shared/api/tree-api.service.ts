import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CreateFamilyTreeModel, FamilyTreeModel } from './models/familyTreeModel';
import { apiHttpOptions, apiUrl } from './api-settings';
import { catchError, map } from 'rxjs/operators';
import { FamilyTreeService } from '../family-tree.service';
import { AuthService } from '../auth.service';
import { FamilyTree } from '../types/familyTree';

@Injectable({
  providedIn: 'root',
})
export class TreeApiService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  private static handleError(error: HttpErrorResponse): Observable<any> {
    return throwError('Error: ' + error.message);
  }

  // --------------------------------------------------- ENDPOINT CALLS --------------------------------------------------------------------

  createTree(familyTree: CreateFamilyTreeModel): Observable<FamilyTreeModel> {
    return this.http
      .post<FamilyTreeModel>(
        apiUrl + 'trees',
        familyTree,
        apiHttpOptions,
      )
      .pipe(catchError(TreeApiService.handleError));
  }

  deleteTree(id: string): Observable<any> {
    return this.http
      .delete(
        apiUrl + 'trees/' + id,
        apiHttpOptions
      )
      .pipe(catchError(TreeApiService.handleError));
  }

  getTreesForUser(): Observable<FamilyTree[]> {
    return this.http
      .get<FamilyTreeModel[]>(
        apiUrl + 'trees/user/' + this.auth.getUsername(),
        apiHttpOptions
      )
      .pipe(
        map((trees) =>
          trees.map(tree => FamilyTreeService.mapModelToObject(tree))
        )
      )
      .pipe(catchError(TreeApiService.handleError));
  }

  getSingleTree(id: string): Observable<FamilyTree> {
    return this.http
      .get<FamilyTreeModel>(
        apiUrl + 'trees/user/' + this.auth.getUsername() + "/" + id,
        apiHttpOptions
      )
      .pipe(
        map(tree =>
          FamilyTreeService.mapModelToObject(tree)
        )
      )
      .pipe(catchError(TreeApiService.handleError));
  }

  updateTree(oldTree:FamilyTree, newTree: CreateFamilyTreeModel): Observable<any> {
    return this.http
      .put<FamilyTreeModel>(
        apiUrl + 'trees/' + oldTree.id,
        newTree,
        apiHttpOptions
      )
      .pipe(catchError(TreeApiService.handleError));
  }

}
