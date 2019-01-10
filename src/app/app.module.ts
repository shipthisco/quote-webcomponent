import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service'



@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule,BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigService],
  entryComponents: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
  const el = createCustomElement(AppComponent, { injector });
  customElements.define('momentum-element', el);
}

ngDoBootstrap() {}
}