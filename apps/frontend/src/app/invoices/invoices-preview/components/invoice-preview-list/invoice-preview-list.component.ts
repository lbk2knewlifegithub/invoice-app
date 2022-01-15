import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Invoice } from "@lbk/models";
import { listIn } from "@lbk/ui";
import {
  fadeOutRightOnLeaveAnimation,
  slideInLeftOnEnterAnimation
} from "angular-animations";

@Component({
  selector: "lbk-invoice-preview-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div @listIn class="grid gap-4">
      <ng-container *ngFor="let invoice of invoices; trackBy: identifyInvoice">
        <lbk-invoice-preview
          @slideInLeftOnEnter
          @fadeOutRightOnLeave
          [invoice]="invoice"
        ></lbk-invoice-preview>
      </ng-container>
    </div>
  `,
  animations: [
    listIn({ staggerDuration: 80, duration: 200 }),
    slideInLeftOnEnterAnimation({ delay: 300 }),
    fadeOutRightOnLeaveAnimation({ delay: 200 }),
  ],
})
export class InvoicePreviewListComponent {
  @Input() invoices!: Invoice[];

  identifyInvoice(index: number, invoice: Invoice) {
    return invoice.id;
  }
}
