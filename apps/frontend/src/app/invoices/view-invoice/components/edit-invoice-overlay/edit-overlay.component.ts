import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InvoiceDto } from "@frontend/dto";
import { DialogService } from "@frontend/shared/dialogs";
import { InvoiceFormComponent } from "@frontend/shared/invoice-form";
import { Invoice } from "@lbk/models";
import { take } from "rxjs";

@Component({
  selector: "lbk-edit-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./edit-overlay.component.html",
})
export class EditOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  @Input() open!: boolean;
  @Input() pendingSaveAndChange!: boolean;
  @Input() invoice!: Invoice;

  @Output() goBack = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() edit = new EventEmitter<{
    id: number;
    invoiceDto: InvoiceDto;
  }>();

  constructor(private readonly _dialogService: DialogService) {}

  onSaveChanges() {
    if (this.invoiceForm.invalid && this.invoiceForm.touched) {
      this.invoiceForm.markAllAsTouched();
      this._dialogService.formInvalid().pipe(take(1)).subscribe();
      return;
    }

    const invoiceDto = this.invoiceFormComponent.createInvoiceDto(
      this.invoice.status
    );

    this.edit.emit({ id: this.invoice.id, invoiceDto });
    this.invoiceForm.markAsUntouched();
  }

  onCancel() {
    if (this.pendingSaveAndChange) return;

    if (this.invoiceForm.dirty) {
      this._dialogService
        .confirmDeactivate()
        .pipe(take(1))
        .subscribe((confirm) => {
          if (confirm) {
            this.cancel.emit();
            this.invoiceFormComponent.initForm(true);
          }
        });

      return;
    }

    this.cancel.emit();
    this.invoiceFormComponent.initForm(true);
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.invoiceForm;
  }
}
