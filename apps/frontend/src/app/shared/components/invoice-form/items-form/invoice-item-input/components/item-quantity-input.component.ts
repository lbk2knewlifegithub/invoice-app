import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-item-quantity-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input-array
      [parent]="parent"
      [groupName]="groupName"
      [arrayName]="arrayName"
      controlName="quantity"
      placeHolder="1"
      label="Qty."
    ></lbk-input-array>
  `,
})
export class ItemQuantityInputComponent extends FormComponent {}
