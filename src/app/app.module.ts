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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { ExportMenuComponent } from './Components/editor/export-menu/export-menu.component';
import { ChildSelectionComponent } from './Components/editor/child-selection/child-selection.component';
import { NodeGraphicComponent } from './Components/node-graphic/node-graphic.component';
import { WaveGraphicComponent } from './Components/wave-graphic/wave-graphic.component';
import { AboutComponent } from './Components/about-page/about.component';
import { ContactComponent } from './contact/contact.component';

// import ngx-translate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ContextMenuContentComponent,
    LandingPageComponent,
    TreeListComponent,
    TreeListItemComponent,
    LoginPageComponent,
    ExportMenuComponent,
    ChildSelectionComponent,
    NodeGraphicComponent,
    WaveGraphicComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

// required for AOT (ahead of time) compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
