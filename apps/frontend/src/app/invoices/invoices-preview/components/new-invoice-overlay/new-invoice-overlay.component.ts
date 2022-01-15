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
import { DialogService } from "@frontend/shared";
import { InvoiceFormComponent } from "@frontend/shared/invoice-form";
import { InvoiceStatus } from "@lbk/models";
import { take } from "rxjs";

@Component({
  selector: "lbk-new-invoice-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./new-invoice-overlay.component.html",
})
export class NewInvoiceOverlayComponent {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  @Input() open!: boolean;
  @Input() pendingSaveAsDraft!: boolean;
  @Input() pendingCreate!: boolean;

  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<InvoiceDto>();
  @Output() create = new EventEmitter<InvoiceDto>();

  constructor(private readonly _dialogService: DialogService) {}

  get invalid() {
    return this.invoiceForm.invalid;
  }

  onDiscard() {
    if (this.pendingCreate || this.pendingSaveAsDraft) return;

    if (this.invoiceForm.dirty) {
      this._dialogService
        .confirmDeactivate()
        .pipe(take(1))
        .subscribe((confirm) => {
          if (confirm) {
            this.discard.emit();
            this.invoiceFormComponent.initForm(true);
          }
        });

      return;
    }

    this.discard.emit();
    this.invoiceFormComponent.initForm(true);
  }

  get invoiceForm(): FormGroup {
    return this.invoiceFormComponent.invoiceForm;
  }

  onCreate() {
    this.invoiceForm.markAllAsTouched();

    if (this.invoiceForm.invalid) {
      this._dialogService.formInvalid().pipe(take(1)).subscribe();
      return;
    }

    this.create.emit(
      this.invoiceFormComponent.createInvoiceDto(InvoiceStatus.PENDING)
    );
    this.invoiceFormComponent.initForm(true);
  }

  onSaveAsDraft() {
    this.invoiceForm.markAllAsTouched();

    if (this.invoiceForm.invalid) {
      this._dialogService.formInvalid().pipe(take(1)).subscribe();
      return;
    }

    this.create.emit(
      this.invoiceFormComponent.createInvoiceDto(InvoiceStatus.DRAFT)
    );

    this.invoiceFormComponent.initForm(true);
  }
}
