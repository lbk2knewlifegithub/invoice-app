import { Component } from "@angular/core";

@Component({
  template: `
    <div class="bg-fill">
      <h3 class="text-fill-900">Are you sure you want to logout?</h3>

      <div class="flex gap-2 mt-6 justify-end">
        <button mat-dialog-close class="btn btn-basic">Cancel</button>
        <button mat-dialog-close="true" class="btn btn-primary">OK</button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
      }
    `,
  ],
})
export class LogoutConfirmationDialogComponent {}
