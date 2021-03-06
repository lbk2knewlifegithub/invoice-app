import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-total-invoices",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1 class="text-2xl md:text-3xl">Invoices</h1>

      <div class="text-muted-700 dark:text-muted-800">
        <p [hidden]="!noInvoices">No invoices</p>
        <p [hidden]="noInvoices">
          <span class="hidden md:inline">There are </span>{{ total }} invoices
          {{ statusFormatted }}
        </p>
      </div>
    </div>
  `,
})
export class TotalInvoicesComponent {
  @Input() total!: number;
  @Input() searchStatus!: string[];

  get noInvoices() {
    return this.total === 0;
  }

  get statusFormatted() {
    if (this.searchStatus.length === 0) return "";
    return this.searchStatus.join(", ") + ".";
  }
}
