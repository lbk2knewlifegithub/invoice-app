import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreateInvoiceDto, UpdateInvoiceDto } from "@lbk/dto";
import { Address, Invoice, Item, Status } from "@lbk/models";
import { addDays, decimalRegex } from "@lbk/utils";

@Component({
  selector: "lbk-invoice-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./invoice-form.component.html",
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoice?: Invoice;

  invoiceForm!: FormGroup;

  constructor(private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();

    setTimeout(() => {
      this.createInvoiceDto();
    }, 300);
  }

  createInvoiceDto(
    newStatus: Status | undefined = undefined
  ): UpdateInvoiceDto | CreateInvoiceDto {
    const { billFrom, billTo, items, status } = this.invoiceForm.value;
    const { createdAt, paymentTerms } = billTo;

    return {
      senderAddress: billFrom,
      status: newStatus ?? status,
      paymentDue: addDays(createdAt, paymentTerms),
      total: this.total(items),
      ...billTo,
      items,
    };
  }

  private total(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      createdAt: [createdAt ?? new Date(), [Validators.required]],
      paymentTerms: [
        paymentTerms ?? 30,
        [Validators.required, Validators.pattern(decimalRegex)],
      ],
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
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1_000_000),
          Validators.pattern(decimalRegex),
        ],
      ],
      price: [
        price ?? 1,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(decimalRegex),
        ],
      ],
      total: [
        total ?? 1,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(decimalRegex),
        ],
      ],
    });
  }

  private _initForm() {
    this.invoiceForm = this._fb.group({
      billFrom: this._initAddress(this.invoice?.senderAddress),
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
