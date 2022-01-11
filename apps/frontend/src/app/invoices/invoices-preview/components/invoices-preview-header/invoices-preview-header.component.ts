import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterDto } from '@frontend/dto';

@Component({
  selector: 'lbk-invoices-preview-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center justify-between">
      <lbk-total-invoices [searchStatus]="searchStatus" [total]="total"></lbk-total-invoices>

      <div class="flex items-center gap-[18px] md:gap-10">
        <lbk-filter (filter)="filter.emit($event)"></lbk-filter>
        <lbk-new-invoice (click)="newInvoice.emit()"></lbk-new-invoice>
      </div>
    </nav>
  `,
})
export class InvoicesPreviewHeaderComponent {
  @Input() total!: number;
  @Input() searchStatus!: string[];


  @Output() filter = new EventEmitter<FilterDto>();
  @Output() newInvoice = new EventEmitter<void>();
}
