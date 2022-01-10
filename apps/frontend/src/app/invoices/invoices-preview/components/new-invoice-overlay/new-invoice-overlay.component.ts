import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CreateInvoiceDto } from "@lbk/dto";
import { Invoice } from "@lbk/models";
import { DialogService } from "@lbk/ui";
import { take } from "rxjs";
import { InvoiceFormComponent } from "../../../../shared/components";

@Component({
  selector: "lbk-new-invoice-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (goBack)="goBack.emit()" [open]="open">
      <lbk-invoice-form [invoice]="invoice" class="panel"></lbk-invoice-form>

      <lbk-new-invoice-actions
        class="actions"
        (discard)="onDiscard()"
        (create)="onCreate()"
        (saveAsDraft)="onSaveAsDraft()"
      ></lbk-new-invoice-actions>
    </lbk-overlay>
  `,
})
export class NewInvoiceOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  invoice!: Invoice;
  @Input() open!: boolean;

  @Output() goBack = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<CreateInvoiceDto>();
  @Output() create = new EventEmitter<CreateInvoiceDto>();

  constructor(private readonly _dialogService: DialogService) {}

  get invalid() {
    return this.invoiceForm.invalid;
  }
  onDiscard() {
    if (this.invoiceForm.dirty) {
      this._dialogService
        .confirmDeactivate()
        .pipe(take(1))
        .subscribe((confirm) => {
          if (confirm) {
            this.discard.emit();
          }
        });

      return;
    }

    this.discard.emit();
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.invoiceForm;
  }
  onCreate() {
    this.create.emit(this.invoiceFormComponent.createInvoiceDto("pending"));
  }
  onSaveAsDraft() {
    this.create.emit(this.invoiceFormComponent.createInvoiceDto("draft"));
  }
}
