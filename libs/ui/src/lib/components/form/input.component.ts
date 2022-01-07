import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormComponent } from './form-group.component';

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
          [type]="inputType"
          [placeholder]="placeHolder"
        />
      </div>
    </div>
  `,
})
export class InputComponent extends FormComponent implements OnInit {
  @Input() controlName!: string;
  @Input() placeHolder!: string;
  @Input() label!: string;
  @Input() inputType = 'text';

  get formControl(): FormControl {
    return this.parent
      .get(this.groupName + '')
      ?.get(this.controlName) as FormControl;
  }

  ngOnInit(): void {
    if (!this.label) this.label = this.controlName;
  }
}
