
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';
@Component({
  selector: 'lbk-country-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="country"
      placeHolder="United Kingdom"
      label="Country"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInputComponent extends FormComponent {}
