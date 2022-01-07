import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '@lbk/models';

@Component({
  selector: 'lbk-invoice-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-details.component.html',
})
export class InvoiceDetailsComponent {
  @Input() invoice!: Invoice;
}
