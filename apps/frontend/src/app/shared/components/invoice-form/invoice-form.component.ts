import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UpdateInvoiceDto } from "@lbk/dto";
import { Address, Invoice, Item } from "@lbk/models";
import * as moment from "moment";

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
    // moment().format('dd-MM-yy').add(1, 'days')
    // return new Date(start).toISOString();
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
      createdAt: [
        createdAt ?? moment().format("dd-MMM-yy"),
        [Validators.required],
      ],
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
