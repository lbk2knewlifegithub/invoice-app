import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CreateInvoiceDto } from "@frontend/dto";
import { InvoiceFormComponent } from "@frontend/shared/components";
import { InvoiceStatus } from "@lbk/models";
import { DialogService } from "@lbk/ui";
import { take } from "rxjs";

@Component({
  selector: "lbk-new-invoice-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (closed)="onDiscard()" [open]="open">
      <lbk-invoice-form class="panel"></lbk-invoice-form>

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

  @Input() open!: boolean;

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
