import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { ViewInvoicePageComponent } from "@frontend/invoices/view-invoice/containers";
import { DialogService } from "@frontend/shared";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class InvoiceFormGuard
  implements CanDeactivate<ViewInvoicePageComponent>
{
  constructor(private readonly _dialogService: DialogService) {}

  canDeactivate(
    viewInvoicePageComponent: ViewInvoicePageComponent
  ): Observable<boolean> {
    const invoiceForm =
      viewInvoicePageComponent.editOverLayComponent?.invoiceForm;
    if (invoiceForm.touched) {
      return this._dialogService.confirmDeactivate();
    }
    return of(true);
  }
}
