import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-description-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="description"
      placeHolder="Graphic Design"
      label="Project Description"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionInputComponent extends FormComponent {}
