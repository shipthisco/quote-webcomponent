import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../app/config.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { createCustomElement } from '@angular/elements';
import { ModalService } from '../app/modal.service'
import { ModalComponent } from '../app/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    QuotationFormComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  providers: [ConfigService,ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(QuotationFormComponent, { injector });
    customElements.define('qutation-element', el);
  }
  ngDoBootstrap() {}
 }
