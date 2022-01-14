import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Credentials } from "@lbk/models";

@Component({
  selector: "lbk-sign-up-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./sign-up-form.component.html",
})
export class SignUpFormComponent implements OnInit {
  @Input() errorMessage!: string | null;
  @Input() pending!: boolean;

  @Output() submitted = new EventEmitter<Credentials>();

  form!: FormGroup;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  error(formControlName: string, error: string) {
    const formControl = this.form.get(formControlName) as FormControl;

    return formControl.hasError(error) && formControl.touched;
  }
}
