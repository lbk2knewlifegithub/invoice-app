import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { CreateInvoiceDto } from "@lbk/dto";
import { InvoiceFormComponent } from "../../../../shared/components";

@Component({
  selector: "lbk-new-invoice-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (goBack)="goBack.emit()" [open]="open">
      <lbk-invoice-form class="panel"></lbk-invoice-form>

      <div scrollTo class="actions flex gap-2 items-center justify-end">
        <!-- discard button -->
        <button (click)="discard.emit()" class="btn btn-basic">Discard</button>
        <!-- end discard button -->

        <!-- save as draft button -->
        <button (click)="saveAsDraft.emit()" class="btn btn-dark">
          Save as Draft
        </button>
        <!-- end save as draft button -->

        <!-- create new invoice button -->
        <button
          [disabled]="invalid"
          (click)="onSaveAndSend()"
          class="btn btn-primary"
        >
          Save & Send
        </button>
        <!-- end create new invoice button -->
      </div>
    </lbk-overlay>
  `,
})
export class NewInvoiceOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceForm!: InvoiceFormComponent;

  @Input() open!: boolean;

  @Output() goBack = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<void>();
  @Output() create = new EventEmitter<CreateInvoiceDto>();

  get invalid() {
    return this.invoiceForm.invoiceForm.invalid;
  }

  onSaveAndSend() {
    this.create.emit(this.invoiceForm.invoiceDto);
  }
}
