import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RouterModule } from "@angular/router";
import { COMPONENTS } from "./components";
import { InvoiceFormComponent } from "./containers";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [COMPONENTS, InvoiceFormComponent],
  exports: [InvoiceFormComponent],
})
export class InvoiceFormModule {}
