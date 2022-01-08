import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormGroupComponent } from "@lbk/ui";
@Component({
  selector: "lbk-bill-to",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./bill-to.component.html",
})
export class BillToComponent extends FormGroupComponent {
  get address(): FormGroup {
    return this.parent.get("billTo") as FormGroup;
  }
}
