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

      <lbk-new-invoice-actions
        class="actions"
        (discard)="discard.emit()"
        (create)="onCreate()"
        (saveAsDraft)="saveAsDraft.emit()"
      ></lbk-new-invoice-actions>
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

  onCreate() {
    this.create.emit(this.invoiceForm.invoiceDto);
  }
}
