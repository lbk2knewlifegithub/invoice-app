import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-client-email-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="clientEmail"
      placeHolder="alexgrim@mail.com"
      label="Client's Email"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEmailInputComponent extends FormComponent {}
