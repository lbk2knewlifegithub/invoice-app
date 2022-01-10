import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '@lbk/models';

@Component({
  selector: 'lbk-invoice-status-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between shadow-sm  md:gap-4 md:justify-start">
      <span class="text-muted-900">Status</span>
      <lbk-invoice-status [status]="status"></lbk-invoice-status>
    </div>
  `,
})
export class InvoiceStatusDetailComponent {
  @Input() status!: Status;
}
