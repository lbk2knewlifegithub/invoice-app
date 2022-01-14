import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-item-total-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p class="text-muted-600">Total</p>
      <p class="mt-3 py-4 px-5 border-muted-500 rounded-[4px]">
        {{ total | number }}
      </p>
    </div>
  `,
})
export class ItemTotalInputComponent {
  @Input() total!: number;
}
