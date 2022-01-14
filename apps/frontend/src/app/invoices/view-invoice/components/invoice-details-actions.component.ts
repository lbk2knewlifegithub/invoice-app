import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

@Component({
  selector: "lbk-invoice-details-actions",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-elements flex flex-wrap justify-end gap-2 py-5 shadow-md px-6 md:bg-transparent md:shadow-none md:py-0 md:px-0"
    >
      <!-- edit -->
      <button (click)="edit.emit()" class="btn btn-basic">Edit</button>
      <!-- end edit -->

      <!-- delete -->
      <button (click)="delete.emit()" class="btn btn-danger">Delete</button>
      <!-- end delete -->

      <!-- mask as paid -->
      <button
        [disabled]="disabledMaskAsPaid"
        (click)="maskAsPaid.emit()"
        class="btn btn-primary"
      >
        <lbk-button-spinner
          [pending]="pending"
          text="Mask as Paid"
        ></lbk-button-spinner>
      </button>
      <!-- end mask as paid -->
    </div>
  `,
})
export class InvoiceDetailsActions {
  @Input() errorMessage!: string | null;
  @Input() pending!: boolean;
  @Input() disabledMaskAsPaid!: boolean;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() maskAsPaid = new EventEmitter<void>();
}
