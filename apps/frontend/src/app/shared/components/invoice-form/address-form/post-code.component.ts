import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';
@Component({
  selector: 'lbk-post-code-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="postCode"
      placeHolder="E1 3EZ"
      label="Post Code"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCodeInputComponent extends FormComponent {}
