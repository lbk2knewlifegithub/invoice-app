import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lbk-new-invoice-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div
        class="flex gap-2 items-center justify-end sm:justify-between"
      >
        <!-- discard button -->
        <button (click)="discard.emit()" class="btn btn-basic">Discard</button>
        <!-- end discard button -->

        <div class="flex gap-2">
          <!-- save as draft button -->
          <button (click)="saveAsDraft.emit()" class="btn btn-dark">
            Save as Draft
          </button>
          <!-- end save as draft button -->

          <!-- create new invoice button -->
          <button (click)="create.emit()" class="btn btn-primary">
            Save & Send
          </button>
          <!-- end create new invoice button -->
        </div>
      </div>
  `
})

export class NewInvoiceActionsComponent {
  @Output() create = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<void>();

}
