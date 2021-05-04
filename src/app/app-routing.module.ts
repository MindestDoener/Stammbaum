import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TreeListComponent } from './tree-list/tree-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'trees',
    component: TreeListComponent
  },
  {
    path: 'trees/:id',
    component: EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
