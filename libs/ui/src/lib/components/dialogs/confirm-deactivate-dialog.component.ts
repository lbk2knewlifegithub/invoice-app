import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lbk-confirm-deactivate-dialog",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-fill">
      <div class="space-y-2">
        <h3 class="text-fill-900">Confirm Cancel</h3>
        <p class="text-muted-900">
          Your form is to be edited. Are you sure to cancel?
        </p>
      </div>

      <div class="flex gap-2 mt-6 justify-end">
        <button mat-dialog-close class="btn btn-basic">Cancel</button>
        <button mat-dialog-close="true" class="btn btn-danger">OK</button>
      </div>
    </div>
  `,
})
export class ConfirmDeactivateDialogComponent {}
