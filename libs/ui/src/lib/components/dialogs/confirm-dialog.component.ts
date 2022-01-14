import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dialog } from "@lbk/models";

@Component({
  selector: "lbk-confirm-dialog",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-fill">
      <div class="space-y-2">
        <h3 class="text-fill-900"></h3>
        <p class="text-muted-900">
        </p>
      </div>

      <div class="flex gap-2 mt-6 justify-end">
        <button mat-dialog-close class="btn btn-basic">Cancel</button>
        <button mat-dialog-close="true" class="btn btn-danger">Delete</button>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly data: { dialog: Dialog }
  ) {}
}
