import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';
@Component({
  selector: 'lbk-street-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="street"
      placeHolder="19 Union Terrace"
      label="Street Address"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreetInputComponent extends FormComponent {}
