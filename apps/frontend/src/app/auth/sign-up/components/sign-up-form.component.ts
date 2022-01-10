import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";
import {
  FormBuilder, FormGroup,
  Validators
} from "@angular/forms";
import { Credentials } from "@lbk/models";

@Component({
  selector: "lbk-sign-up-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./sign-up-form.component.html",
})
export class SignUpFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    // if (isPending) {
    //   this.form.disable();
    // } else {
    //   this.form.enable();
    // }
  }
  @Input() errorMessage!: string | null;

  @Output() submitted = new EventEmitter<Credentials>();

  form!: FormGroup;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
