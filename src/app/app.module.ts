import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';
import {FormPage1Component} from './form/form-page1/form-page1.component';
import {FormPage2Component} from './form/form-page2/form-page2.component';
import {FormPage3Component, SafePipe} from './form/form-page3/form-page3.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormPage1Component,
    FormPage2Component,
    FormPage3Component,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
