import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-address-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <!-- title -->
      <h5 [hidden]="!displayTitle" class="text-primary-900">Bill Form</h5>
      <!-- end title -->

      <div
        [class.mt-0]="!displayTitle"
        [formGroupName]="groupName ?? null"
        class="mt-6 grid gap-6"
      >
        <lbk-street-input
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-street-input>

        <div class="grid grid-cols-2 gap-6">
          <lbk-city-input
            [parent]="parent"
            [groupName]="groupName"
          ></lbk-city-input>

          <lbk-post-code-input
            [parent]="parent"
            [groupName]="groupName"
          ></lbk-post-code-input>
        </div>

        <lbk-country-input
          [parent]="parent"
          [groupName]="groupName"
        ></lbk-country-input>
      </div>
    </div>
  `,
})
export class AddressFormComponent extends FormComponent {
  @Input() displayTitle = true;
}
