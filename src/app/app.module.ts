import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './Components/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuContentComponent } from './Components/editor/context-menu-content/context-menu-content.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { TreeListComponent } from './Components/tree-list/tree-list.component';
import { TreeListItemComponent } from './Components/tree-list/tree-list-item/tree-list-item.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiselectComponent } from './Components/editor/multiselect/multiselect.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { ExportMenuComponent } from './Components/editor/export-menu/export-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ContextMenuContentComponent,
    LandingPageComponent,
    TreeListComponent,
    TreeListItemComponent,
    MultiselectComponent,
    LoginPageComponent,
    ExportMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
