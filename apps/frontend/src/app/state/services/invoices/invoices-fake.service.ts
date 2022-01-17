import { Injectable } from "@angular/core";
import { InvoiceDto } from "@frontend/dto";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { invoicesStub } from "@lbk/stubs";
import { map, Observable, of, tap } from "rxjs";
import { InvoicesService } from "./invoices.service";

@Injectable({ providedIn: "root" })
export class InvoicesFakeService implements InvoicesService {
  private _invoices = [...invoicesStub()];
  private id = this._invoices.length + 1;

  getInvoices(): Observable<Invoice[]> {
    console.log("fake loaded invoices");

    return of(this._invoices);
  }

  retrieveInvoice(id: number): Observable<Invoice> {
    return this.getInvoices().pipe(
      map((invoices) => invoices.find((invoice) => invoice.id == id)!),
      tap((invoice) => {
        console.log(id, invoice);

        if (!invoice) throw new Error("Invoice not found");
      })
    );
  }

  deleteInvoice(id: number): Observable<void> {
    this._invoices = this._invoices.filter((invoice) => invoice.id !== id);
    return of(void 0);
  }

  maskAsPaid(id: number): Observable<void> {
    this._invoices = this._invoices.map((invoice) =>
      invoice.id !== id ? invoice : { ...invoice, status: InvoiceStatus.PAID }
    );
    return of(void 0);
  }

  editInvoice(id: number, invoiceDto: InvoiceDto): Observable<void> {
    this._invoices = this._invoices.map((invoice) =>
      invoice.id !== id ? invoice : { ...invoiceDto, id }
    );

    return of(void 0);
  }

  createInvoice(createInvoiceDto: InvoiceDto): Observable<Invoice> {
    const newInvoice = {
      id: this.id,
      ...createInvoiceDto,
    };

    this._invoices = [newInvoice, ...this._invoices];

    this.id++;
    return of(newInvoice);
  }
}
