import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UpdateInvoiceDto } from "@lbk/dto";
import { Address, Invoice, Item } from "@lbk/models";

@Component({
  selector: "lbk-invoice-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- title -->
    <lbk-invoice-form-title [id]="invoice?.id"></lbk-invoice-form-title>
    <!-- end title -->

    <form [formGroup]="invoiceForm" class="mt-6">
      <lbk-address-form
        [parent]="invoiceForm"
        groupName="senderAddress"
      ></lbk-address-form>

      <lbk-bill-to
        class="block mt-10"
        [parent]="invoiceForm"
        groupName="billTo"
      ></lbk-bill-to>

      <lbk-items-form
        arrayName="items"
        class="block mt-16"
        [parent]="invoiceForm"
        (delete)="delete($event)"
        (addNewItem)="addNewItem()"
      ></lbk-items-form>
    </form>
  `,
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoice?: Invoice;

  invoiceForm!: FormGroup;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  get invoiceDto(): UpdateInvoiceDto {
    const { billFrom, billTo, items } = this.invoiceForm.value;

    return {
      senderAddress: billFrom,
      paymentDue: this.createPaymentDue(),
      ...billTo,
      items,
    };
  }

  private createPaymentDue() {
    const { createdAt, paymentTerms } = this.invoiceForm.value;
    const start = new Date(createdAt);
    start.setDate(new Date(paymentTerms).getDate());
    return new Date(start).toISOString();
  }

  private _initAddress(address: Partial<Address | undefined>) {
    const { street, city, postCode, country } = address ?? {};

    return this._fb.group({
      street: [street ?? "", [Validators.required, Validators.maxLength(50)]],
      city: [city ?? "", [Validators.required, Validators.maxLength(20)]],
      postCode: [
        postCode ?? "",
        [Validators.required, Validators.maxLength(10)],
      ],
      country: [country ?? "", [Validators.required, Validators.maxLength(20)]],
    });
  }
  private get _initBillTo(): FormGroup {
    const { clientName, clientEmail, createdAt, paymentTerms, description } =
      this.invoice || {};

    return this._fb.group({
      clientName: [
        clientName ?? "",
        [Validators.required, Validators.maxLength(50)],
      ],
      clientEmail: [clientEmail ?? "", [Validators.required, Validators.email]],
      clientAddress: this._initAddress(this.invoice?.clientAddress),
      createdAt: [createdAt ?? new Date().toISOString(), [Validators.required]],
      paymentTerms: [paymentTerms ?? 30, [Validators.required]],
      description: [description ?? "", [Validators.required]],
    });
  }

  private get _initItems(): FormArray {
    const { items } = this.invoice ?? {};
    return this._fb.array(items?.map((i) => this.createItem(i)) || []);
  }

  private createItem(item: Partial<Item>) {
    const { name, quantity, price, total } = item;
    return this._fb.group({
      name: [name ?? "", [Validators.required, Validators.maxLength(50)]],
      quantity: [
        quantity ?? 1,
        [Validators.required, Validators.min(1), Validators.max(1_000_000)],
      ],
      price: [price ?? 1, [Validators.required, Validators.min(1)]],
      total: [total ?? 1, [Validators.required, Validators.min(1)]],
    });
  }

  private _initForm() {
    this.invoiceForm = this._fb.group({
      senderAddress: this._initAddress(this.invoice?.senderAddress),
      billTo: this._initBillTo,
      items: this._initItems,
    });
  }

  get isEdit() {
    return !!this.invoice;
  }

  get items() {
    return this.invoiceForm.get("items") as FormArray;
  }

  delete(index: number) {
    this.items.removeAt(index);
  }

  addNewItem() {
    this.items.push(this.createItem({}));
  }
}
