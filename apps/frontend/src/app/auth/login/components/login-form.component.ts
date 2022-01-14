import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Credentials } from "@lbk/models";

@Component({
  selector: "lbk-login-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./login-form.component.html",
})
export class LoginFormComponent implements OnInit {
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
    if (this.form.invalid) return;
    this.submitted.emit(this.form.value);
  }
}
