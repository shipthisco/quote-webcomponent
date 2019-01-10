import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationFormComponent } from './quotation-form/quotation-form.component';

const routes: Routes = [
  {path: '', component: QuotationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
