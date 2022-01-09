import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { UpdateInvoiceDto } from "@lbk/dto";
import { Invoice } from "@lbk/models";
import { InvoiceFormComponent } from "../../../../shared/components/invoice-form/invoice-form.component";

@Component({
  selector: "lbk-edit-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (goBack)="goBack.emit()" [open]="open">
      <lbk-invoice-form class="panel" [invoice]="invoice"></lbk-invoice-form>

      <div class="actions flex gap-2 items-center justify-end">
        <button (click)="cancel.emit()" class="btn btn-basic">Cancel</button>
        <button (click)="onSaveChanges()" class="btn btn-primary">
          Save Changes
        </button>
      </div>
    </lbk-overlay>
  `,
})
export class EditOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceForm!: InvoiceFormComponent;

  @Input() open!: boolean;
  @Input() invoice!: Invoice;
  @Output() goBack = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() edit = new EventEmitter<{
    id: string;
    updateInvoiceDto: UpdateInvoiceDto;
  }>();

  onSaveChanges() {
    const updateInvoiceDto = this.invoiceForm.invoiceDto;
    this.edit.emit({ id: this.invoice.id, updateInvoiceDto });
  }
}
