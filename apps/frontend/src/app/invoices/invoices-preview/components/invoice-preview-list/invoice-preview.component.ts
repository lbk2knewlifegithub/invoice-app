import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice, PriceOptions } from '@lbk/models';

@Component({
  selector: 'lbk-invoice-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="['/invoices', id]"
      class="rounded-lg bg-white p-6 grid gap-6"
    >
      <div class="flex items-center justify-between">
        <!-- id -->
        <lbk-invoice-id [value]="invoice.id"></lbk-invoice-id>
        <!-- end id -->

        <!-- name -->
        <p class="text-muted-900">{{ invoice.clientName }}</p>
        <!-- end name -->
      </div>

      <div class="flex items-center justify-between">
        <div>
          <!-- due date -->
          <p class="text-muted-800">
            Due {{ invoice.paymentDue | date: 'dd-MMM-yyyy' }}
          </p>
          <!-- end due date -->

          <!-- price -->
          <lbk-price
            [options]="priceOptions"
            class="block mt-2"
            [value]="invoice.total"
          ></lbk-price>
          <!-- end price -->
        </div>

        <!-- status -->
        <lbk-invoice-status [status]="invoice.status"></lbk-invoice-status>
        <!-- end status -->
      </div>
    </a>
  `,
})
export class InvoicePreviewComponent {
  @Input() invoice!: Invoice;

  priceOptions: PriceOptions = { size: 'text-lg' };

  get id() {
    return this.invoice.id;
  }
}
