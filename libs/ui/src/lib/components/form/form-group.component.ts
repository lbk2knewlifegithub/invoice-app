import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Unsubscribe } from '../unsubscribe.component';

@Component({
  selector: 'lbk-form',
  template: ``,
})
export class FormGroupComponent extends Unsubscribe {
  @Input() parent!: FormGroup;
  @Input() groupName!: string;
  @Input() arrayName!: string;
}
