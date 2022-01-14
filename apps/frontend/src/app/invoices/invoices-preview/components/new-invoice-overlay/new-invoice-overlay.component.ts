import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { InvoiceDto } from "@frontend/dto";
import { InvoiceFormComponent } from "@frontend/shared/components";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { invoiceStub } from "@lbk/stubs";
import { DialogService } from "@lbk/ui";
import { take } from "rxjs";

@Component({
  selector: "lbk-new-invoice-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-overlay (closed)="onDiscard()" [open]="open">
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
export class NewInvoiceOverlayComponent implements OnInit {
  @ViewChild(InvoiceFormComponent, { static: true })
  invoiceFormComponent!: InvoiceFormComponent;

  @Input() open!: boolean;

  @Output() discard = new EventEmitter<void>();
  @Output() saveAsDraft = new EventEmitter<InvoiceDto>();
  @Output() create = new EventEmitter<InvoiceDto>();

  invoice!: Invoice;

  constructor(private readonly _dialogService: DialogService) {}
  ngOnInit(): void {
    this.invoice = invoiceStub();
  }

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
