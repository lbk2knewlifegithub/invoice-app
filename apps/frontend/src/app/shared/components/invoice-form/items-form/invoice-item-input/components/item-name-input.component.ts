import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-item-name-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input-array
      [parent]="parent"
      [groupName]="groupName"
      space="mt-[16px]"
      [arrayName]="arrayName"
      controlName="name"
      placeHolder="Banner Design"
      label="Item Namge"
    ></lbk-input-array>
  `,
})
export class ItemNameInputComponent extends FormComponent {}
