import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lbk-confirm-delete-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-fill">
      <div class="space-y-2">
        <h3 class="text-fill-900">Confirm Deletion</h3>
        <p class="text-muted-900">
          Are you sure you want delete invoice #{{ id }}? This action cannot be
          undone.
        </p>
      </div>

      <div class="flex gap-2 mt-6 justify-end">
        <button mat-dialog-close class="btn btn-basic">Cancel</button>
        <button mat-dialog-close="true" class="btn btn-danger">Delete</button>
      </div>
    </div>
  `,
})
export class ConfirmDeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly id: string
  ) {}
}
