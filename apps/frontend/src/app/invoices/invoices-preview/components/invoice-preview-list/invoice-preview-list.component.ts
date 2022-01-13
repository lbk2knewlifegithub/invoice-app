import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Invoice } from "@lbk/models";

@Component({
  selector: "lbk-invoice-preview-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <ng-container *ngFor="let invoice of invoices; trackBy: identifyInvoice">
        <lbk-invoice-preview [invoice]="invoice"></lbk-invoice-preview>
      </ng-container>
    </div>
  `,
})
export class InvoicePreviewListComponent {
  @Input() invoices!: Invoice[];

  identifyInvoice(index: number, invoice: Invoice) {
    return invoice.id;
  }
}
