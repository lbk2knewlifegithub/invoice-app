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
  @Input() pending!: boolean;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() maskAsPaid = new EventEmitter<void>();

  onMaskAsPaid() {
    if (this.invoice.status === "paid") return;
    this.maskAsPaid.emit();
  }
  get disabledMaskAsPaid() {
    return this.pending || this.invoice.status === InvoiceStatus.PAID;
  }
}
