import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UIModule } from '@lbk/ui';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { fromInvoiceForm } from './components';

export const COMPONENTS = [fromInvoiceForm.COMPONENTS];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UIModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class SharedModule {}
