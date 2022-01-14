import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-invoice-id",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="md:text-lg">
      <span class="text-muted-800">#</span>
      <span class="font-bold">
        {{ value }}
      </span>
    </p>
  `,
})
export class InvoiceIdComponent {
  @Input() value!: number;
}
