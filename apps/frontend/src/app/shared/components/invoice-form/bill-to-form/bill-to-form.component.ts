import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent } from '@lbk/ui';
@Component({
  selector: 'lbk-bill-to-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <!-- title -->
      <h5 class="text-primary-900">Bill To</h5>
      <!-- end title -->

      <div [formGroupName]="groupName ?? null" class="mt-6 grid gap-6">
        <lbk-client-name-input
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-client-name-input>

        <lbk-client-email-input
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-client-email-input>

        <lbk-address-form
          [parent]="address"
          groupName="clientAddress"
          [displayTitle]="false"
        ></lbk-address-form>

        <lbk-invoice-date-input
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-invoice-date-input>

        <lbk-payment-terms
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-payment-terms>

        <lbk-description-input
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-description-input>
      </div>
    </div>
  `,
})
export class BillToFormComponent extends FormComponent {
  get address(): FormGroup {
    return this.parent.get('billTo') as FormGroup;
  }
}
