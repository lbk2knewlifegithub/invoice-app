import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroupComponent } from '../form-group.component';

@Component({
  selector: 'lbk-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formGroupName]="groupName">
        <label [for]="controlName" class="text-muted-600">{{
          label | titlecase
        }}</label>

        <input
          [formControlName]="controlName"
          [id]="controlName"
          class="mt-[10px]"
          [name]="controlName"
          [type]="inputType"
          [placeholder]="placeHolder"
        />
      </div>
    </div>
  `,
})
export class InputComponent extends FormGroupComponent implements OnInit {
  @Input() controlName!: string;
  @Input() placeHolder!: string;
  @Input() label!: string;
  @Input() inputType = 'text';
  @Input() name!:string;

  get formControl(): FormControl {
    return this.parent
      .get(this.groupName + '')
      ?.get(this.controlName) as FormControl;
  }

  ngOnInit(): void {
    if (!this.label) this.label = this.controlName;
    if (!this.name) this.name = this.controlName;
  }
}
