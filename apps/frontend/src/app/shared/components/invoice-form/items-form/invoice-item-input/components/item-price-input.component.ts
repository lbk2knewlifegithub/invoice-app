import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-item-price-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input-array
      [parent]="parent"
      [groupName]="groupName"
      [arrayName]="arrayName"
      controlName="price"
      placeHolder="100"
      label="Price"
    ></lbk-input-array>
  `,
})
export class ItemPriceInputComponent extends FormComponent {}
