import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './Components/editor/editor.component';
import { EditorResolverService } from './Components/editor/editor.resolver';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { TreeListComponent } from './Components/tree-list/tree-list.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { AboutComponent } from './Components/about-page/about.component';
import { AuthService } from './shared/auth.service';
import { ContactComponent } from './contact/contact.component';

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
    canActivate: [AuthService],
  },
  {
    path: 'trees/:id',
    component: EditorComponent,
    resolve: {
      tree: EditorResolverService
    },
    canActivate: [AuthService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: LoginPageComponent,
  },
  {
    path: 'howto',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [EditorResolverService]
})
export class AppRoutingModule {
}
