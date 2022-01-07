import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-client-name-input',
  template: `
    <lbk-input
      [parent]="parent"
      [groupName]="groupName"
      controlName="clientName"
      placeHolder="Alex Grim"
      label="Client's Name"
    ></lbk-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientNameInputComponent extends FormComponent {}
