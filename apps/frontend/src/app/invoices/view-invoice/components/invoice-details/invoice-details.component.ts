import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from '@lbk/models';

@Component({
  selector: 'lbk-invoice-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-details.component.html',
})
export class InvoiceDetailsComponent {
  @Input() invoice!: Invoice;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() maskAsPaid = new EventEmitter<void>();
}
