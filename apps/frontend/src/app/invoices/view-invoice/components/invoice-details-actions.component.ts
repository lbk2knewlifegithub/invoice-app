import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'lbk-invoice-details-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-elements flex justify-center gap-2 py-5 shadow-md">
      <!-- edit -->
      <button (click)="edit.emit()" class="btn btn-basic">Edit</button>
      <!-- end edit -->

      <!-- delete -->
      <button (click)="delete.emit()" class="btn btn-danger">Delete</button>
      <!-- end delete -->

      <!-- mask as paid -->
      <button (click)="maskAsPaid.emit()" class="btn btn-primary">
        Mask as Paid
      </button>
      <!-- end mask as paid -->
    </div>
  `,
})
export class InvoiceDetailsActions {
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() maskAsPaid = new EventEmitter<void>();
}
