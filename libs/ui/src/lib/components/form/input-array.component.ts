import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroupComponent } from './form-group.component';

@Component({
  selector: 'lbk-input-array',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formArrayName]="arrayName">
        <div [formGroupName]="groupName">
          <label [for]="controlName" class="text-muted-600">{{
            label | titlecase
          }}</label>

          <input
            [formControlName]="controlName"
            [attr.disabled]="disabled ? 'disabled' : null"
            class="disabled:hidden"
            [id]="controlName"
            [classList]="space"
            [type]="inputType"
            [placeholder]="placeHolder"
          />
        </div>
      </div>
    </div>
  `,
})
export class InputArrayComponent extends FormGroupComponent implements OnInit {
  @Input() controlName!: string;
  @Input() placeHolder!: string;
  @Input() label!: string;
  @Input() inputType = 'text';
  @Input() disabled = false;

  /**
   * The space between input and label
   */
  @Input() space = 'mt-[10px]';

  get formControl(): FormControl {
    return this.parent
      .get(this.groupName + '')
      ?.get(this.controlName) as FormControl;
  }

  ngOnInit(): void {
    if (!this.label) this.label = this.controlName;
  }
}
