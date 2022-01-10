import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UpdateInvoiceDto } from "@lbk/dto";
import { Invoice } from "@lbk/models";
import { DialogService } from "@lbk/ui";
import { take } from "rxjs";
import { InvoiceFormComponent } from "../../../../shared/components/invoice-form/invoice-form.component";

@Component({
  selector: "lbk-edit-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (goBack)="goBack.emit()" [open]="open">
      <lbk-invoice-form class="panel" [invoice]="invoice"></lbk-invoice-form>

      <div class="actions flex gap-2 items-center justify-end">
        <button (click)="onCancel()" class="btn btn-basic">Cancel</button>
        <button (click)="onSaveChanges()" class="btn btn-primary">
          Save Changes
        </button>
      </div>
    </lbk-overlay>
  `,
})
export class EditOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  @Input() open!: boolean;
  @Input() invoice!: Invoice;

  @Output() goBack = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() edit = new EventEmitter<{
    id: string;
    updateInvoiceDto: UpdateInvoiceDto;
  }>();

  constructor(private readonly _dialogService: DialogService) {}

  onSaveChanges() {
    const updateInvoiceDto = this.invoiceFormComponent.createInvoiceDto(
      this.invoice.status
    );
    this.edit.emit({ id: this.invoice.id, updateInvoiceDto });
  }

  onCancel() {
    if (this.invoiceForm.dirty) {
      this._dialogService
        .confirmDeactivate()
        .pipe(take(1))
        .subscribe((confirm) => {
          if (confirm) {
            this.cancel.emit();
          }
        });

      return;
    }

    this.cancel.emit();
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.invoiceForm;
  }
}
