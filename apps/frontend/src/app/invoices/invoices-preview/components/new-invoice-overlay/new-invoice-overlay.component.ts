import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import * as fromData from "@frontend/shared/data";
import { CreateInvoiceDto } from "@lbk/dto";
import { Invoice } from "@lbk/models";
import { InvoiceFormComponent } from "../../../../shared/components";

@Component({
  selector: "lbk-new-invoice-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (goBack)="goBack.emit()" [open]="open">
      <lbk-invoice-form [invoice]="invoice" class="panel"></lbk-invoice-form>

      <lbk-new-invoice-actions
        class="actions"
        (discard)="discard.emit()"
        (create)="onCreate()"
        (saveAsDraft)="onSaveAsDraft()"
      ></lbk-new-invoice-actions>
    </lbk-overlay>
  `,
})
export class NewInvoiceOverlayComponent implements OnInit {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceForm!: InvoiceFormComponent;

  invoice!: Invoice;
  @Input() open!: boolean;

  @Output() goBack = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<CreateInvoiceDto>();
  @Output() create = new EventEmitter<CreateInvoiceDto>();

  get invalid() {
    return this.invoiceForm.invoiceForm.invalid;
  }
  ngOnInit(): void {
    this.invoice = fromData.invoices[0];
  }

  onCreate() {
    this.create.emit(this.invoiceForm.createInvoiceDto("pending"));
  }
  onSaveAsDraft() {
    this.create.emit(this.invoiceForm.createInvoiceDto("draft"));
  }
}
