import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormGroupComponent } from "../form-helper/form-group.component";

@Component({
  selector: "lbk-invoice-date-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName ?? null">
        <label (click)="picker.open()" class="text-muted-600"
          >Invoice Date</label
        >
        <div  class="relative  min-h-[48px]">
          <input
            class="mt-[10px] block h-full"
            type="text"
            id="createdAt"
            formControlName="createdAt"
            placeholder="Date Time"
            [matDatepicker]="picker"
            (click)="picker.open()"
          />
          <mat-datepicker-toggle

            class="absolute top-1/2 -translate-y-1/2 right-1"
            [for]="picker"
          ></mat-datepicker-toggle>

          <mat-datepicker touchUi #picker></mat-datepicker>
        </div>
      </div>
    </div>
  `,
})
export class InvoiceDateComponent extends FormGroupComponent {}
