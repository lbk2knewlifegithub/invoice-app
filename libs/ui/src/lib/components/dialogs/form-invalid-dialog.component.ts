
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lbk-form-invalid-dialog",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-fill">
      <div class="space-y-2">
        <h3 class="text-fill-900">Invalid</h3>
        <p class="text-muted-900">
          Your form is invalid please try again!
        </p>
      </div>

      <div class="flex gap-2 mt-6 justify-end">
        <button mat-dialog-close class="btn btn-danger">OK</button>
      </div>
    </div>
  `,
})
export class FormInvalidDialog {}
