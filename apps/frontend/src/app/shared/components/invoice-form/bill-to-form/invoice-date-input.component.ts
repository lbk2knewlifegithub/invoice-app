import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-invoice-date-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName ?? null">
        <label for="createdAt" class="text-muted-600">Invoice Date</label>
        <div class="relative bg-red-300 min-h-[48px]">
          <input
            class="mt-[10px] block h-full"
            type="text"
            id="createdAt"
            formControlName="createdAt"
            [value]="dt1.registerInput"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            placeholder="Date Time"
          />

          <!-- calendar icon -->
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
            [owlDateTimeTrigger]="dt1"
          >
            <i class=" far fa-calendar "></i>
          </button>
          <!-- end calendar icon -->

          <owl-date-time [pickerType]="'calendar'" #dt1></owl-date-time>
        </div>
      </div>
    </div>
  `,
})
export class InvoiceDateComponent extends FormComponent {}
