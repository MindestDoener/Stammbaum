import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './Components/editor/editor.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { TreeListComponent } from './Components/tree-list/tree-list.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LandingPageComponent,
  },
  {
    path: 'trees',
    component: TreeListComponent,
  },
  {
    path: 'trees/:id',
    component: EditorComponent,
  },
  {
    path: 'Anmelden',
    component: LoginPageComponent,
  },
  {
    path: 'Registrieren',
    component: LoginPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
