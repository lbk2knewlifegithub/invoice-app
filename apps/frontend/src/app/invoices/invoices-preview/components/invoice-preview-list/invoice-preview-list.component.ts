import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Invoice } from "@lbk/models";

@Component({
  selector: "lbk-invoice-preview-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div @list class="grid gap-4">
      <ng-container *ngFor="let invoice of invoices; trackBy: identifyInvoice">
        <lbk-invoice-preview [invoice]="invoice"></lbk-invoice-preview>
      </ng-container>
    </div>
  `,
  animations: [
    trigger("list", [
      transition(":enter", [
        query(
          "lbk-invoice-preview",
          [
            style({ opacity: 0, transform: "translateY(-20px) scale(.9)" }),
            stagger(100, [animate("200ms")]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class InvoicePreviewListComponent {
  @Input() invoices!: Invoice[];

  identifyInvoice(index: number, invoice: Invoice) {
    return invoice.id;
  }
}
