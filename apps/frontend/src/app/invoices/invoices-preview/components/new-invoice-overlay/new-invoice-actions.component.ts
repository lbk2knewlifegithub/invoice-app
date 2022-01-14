import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";

@Component({
  selector: "lbk-new-invoice-actions",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-wrap gap-2 items-center justify-end sm:justify-between"
    >
      <!-- discard button -->
      <button
        [disabled]="disabled"
        (click)="discard.emit()"
        class="btn btn-basic dark:bg-[#F9FAFE] dark:text-muted-700"
      >
        Discard
      </button>
      <!-- end discard button -->

      <div class="flex gap-2">
        <!-- save as draft button -->
        <button
          [disabled]="disabled"
          (click)="saveAsDraft.emit()"
          class="btn btn-dark"
        >
          <lbk-button-spinner
            [pending]="pendingSaveAsDraft"
            text="Save as Draft"
          ></lbk-button-spinner>
        </button>
        <!-- end save as draft button -->

        <!-- create new invoice button -->
        <button
          [disabled]="disabled"
          (click)="create.emit()"
          class="btn btn-primary"
        >
          <lbk-button-spinner
            [pending]="pendingCreate"
            text="Save & Send"
          ></lbk-button-spinner>
        </button>
        <!-- end create new invoice button -->
      </div>
    </div>
  `,
})
export class NewInvoiceActionsComponent {
  @Input() pendingSaveAsDraft!: boolean;
  @Input() pendingCreate!: boolean;

  @Output() create = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<void>();

  get disabled() {
    return this.pendingCreate || this.pendingSaveAsDraft;
  }
}
