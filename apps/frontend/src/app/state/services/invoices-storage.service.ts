import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE_TOKEN } from "@frontend/constants";
import * as fromData from "@frontend/shared/data";
import { CreateInvoiceDto, UpdateInvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { map, Observable, of, tap, throwError } from "rxjs";
import { InvoicesService } from ".";

@Injectable({ providedIn: "root" })
export class InvoicesStorageService implements InvoicesService {
  private invoicesStorageKey = "invoices";

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => "Local Storage Not Supported");
  }

  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

  getInvoices(): Observable<Invoice[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.invoicesStorageKey)),
      map((value: string | null) =>
        value ? JSON.parse(value) : fromData.invoices
      )
    );
  }

  retrieveInvoice(id: string): Observable<Invoice> {
    return this.getInvoices().pipe(
      map((invoices) => invoices.find((invoice) => invoice._id === id)),
      tap((invoice) => {
        if (!invoice) throw new Error("Not founded");
      }),
      map((invoice) => invoice!)
    );
  }

  deleteInvoice(id: string): Observable<Invoice[]> {
    return this.getInvoices().pipe(
      map((invoices) => invoices.filter((invoice) => invoice._id !== id)),
      tap((invoices) => this.save(invoices))
    );
  }

  maskAsPaid(id: string): Observable<Invoice[]> {
    return this.getInvoices().pipe(
      map((invoices) =>
        invoices.map((invoice) =>
          invoice._id !== id
            ? invoice
            : ({ ...invoice, status: "paid" } as Invoice)
        )
      ),
      tap((invoices) => this.save(invoices))
    );
  }

  updateInvoice(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto
  ): Observable<Invoice[]> {
    return this.getInvoices().pipe(
      map((invoices) =>
        invoices.map((invoice) =>
          invoice._id !== id
            ? invoice
            : ({ ...invoice, ...updateInvoiceDto } as Invoice)
        )
      ),
      tap((invoices) => this.save(invoices))
    );
  }
  private createId(): string {
    const tmp = ["l", "b", "k", "b", "a", "n"];
    let result = "";

    while (result.length !== 6) {
      if (Math.random() > 0.5) {
        result += tmp[Math.floor(Math.random() * tmp.length)];
        continue;
      }

      result += Math.floor(Math.random() * 10);
    }

    return result;
  }

  createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
    const newInvoice: Invoice = { _id: this.createId(), ...createInvoiceDto };
    return this.getInvoices().pipe(
      map((invoices) => [newInvoice, ...invoices]),
      tap((invoices) => this.save(invoices)),
      map((_) => newInvoice)
    );
  }

  private save(invoices: Invoice[]) {
    this.storage.setItem(this.invoicesStorageKey, JSON.stringify(invoices));
  }
}
