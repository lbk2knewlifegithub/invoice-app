import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-invoice-form-title",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>
      <div *ngIf="id; else newInvoice" class="flex gap-2 items-center">
        <span>Edit </span>
        <!-- id -->
        <p class="md:text-lg lg:text-2xl">
          <span class="text-muted-800">#</span>
          <span class="font-bold">
            {{ id | uppercase }}
          </span>
        </p>
        <!-- id -->
      </div>

      <ng-template #newInvoice> New Invoice </ng-template>
    </h2>
  `,
})
export class InvoiceFormTitleComponent {
  @Input() id?: string;
}
