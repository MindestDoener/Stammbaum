import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PersonDisplayComponent } from './editor/person-display/person-display.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    PersonDisplayComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
