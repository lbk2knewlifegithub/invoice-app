import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-total-invoices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h2 class="md:text-3xl">Invoices</h2>

      <div class="text-muted-700">
        <p [hidden]="!noInvoices">No invoices</p>
        <p [hidden]="noInvoices"> <span class="hidden md:inline">There are </span>{{ total }} invoices</p>
      </div>
    </div>
  `,
})
export class TotalInvoicesComponent {
  @Input() total!: number;

  get noInvoices() {
    return this.total === 0;
  }
}
