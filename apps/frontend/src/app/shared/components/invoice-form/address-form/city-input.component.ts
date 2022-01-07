import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-city-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="city"
      placeHolder="London"
      label="City"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityInputComponent extends FormComponent {}
