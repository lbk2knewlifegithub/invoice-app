import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { Invoice, InvoiceStatus } from "@lbk/models";

@Component({
  selector: "lbk-invoice-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./invoice-details.component.html",
})
export class InvoiceDetailsComponent {
  @Input() invoice!: Invoice;
  @Input() errorMessage!: string | null;

  @Input() pendingMaskAsPaid!: boolean;
  @Input() pendingDelete!: boolean;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() maskAsPaid = new EventEmitter<void>();

  onMaskAsPaid() {
    if (this.invoice.status === "paid") return;
    this.maskAsPaid.emit();
  }

  get isPaid() {
    return this.invoice.status == InvoiceStatus.PAID;
  }
}
