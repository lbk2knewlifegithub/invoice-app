import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UIModule } from '@lbk/ui';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
  AddNewItemComponent,
  AddressFormComponent,
  BillToFormComponent,
  CityInputComponent,
  ClientEmailInputComponent,
  ClientNameInputComponent,
  CountryInputComponent,
  DeleteButtonComponent,
  DescriptionInputComponent,
  InvoiceDateComponent,
  InvoiceFormComponent,
  InvoiceFormTitleComponent,
  InvoiceItemInputComponent,
  InvoiceItemInputListComponent,
  ItemNameInputComponent,
  ItemPriceInputComponent,
  ItemQuantityInputComponent,
  ItemsFormComponent,
  ItemTotalInputComponent,
  PaymentTermsComponent,
  PostCodeInputComponent,
  StreetInputComponent
} from './components';

export const COMPONENTS = [
  AddressFormComponent,
  BillToFormComponent,
  AddNewItemComponent,
  CityInputComponent,
  ClientEmailInputComponent,
  ClientNameInputComponent,
  CountryInputComponent,
  DeleteButtonComponent,
  DescriptionInputComponent,
  InvoiceDateComponent,
  InvoiceFormComponent,
  InvoiceFormTitleComponent,
  InvoiceItemInputComponent,
  InvoiceItemInputListComponent,
  ItemNameInputComponent,
  ItemPriceInputComponent,
  ItemQuantityInputComponent,
  ItemTotalInputComponent,
  ItemsFormComponent,
  PaymentTermsComponent,
  PostCodeInputComponent,
  StreetInputComponent,
];

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
