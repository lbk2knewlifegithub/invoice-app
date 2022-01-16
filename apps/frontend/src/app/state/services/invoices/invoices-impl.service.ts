import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvoiceDto } from "@frontend/dto";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { environment as env } from "apps/frontend/src/environments/environment";
import { map, Observable } from "rxjs";
import { InvoicesService } from "./invoices.service";

@Injectable({ providedIn: "root" })
export class InvoicesImplService implements InvoicesService {
  constructor(private readonly _http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this._http
      .get<{ [key: string]: Invoice }>(`${env.api}invoices`)
      .pipe(map((res) => Object.values(res)));
  }

  retrieveInvoice(id: number): Observable<Invoice> {
    return this._http.get<Invoice>(`${env.api}invoices/${id}`);
  }

  deleteInvoice(id: number): Observable<void> {
    return this._http.delete<void>(`${env.api}invoices/${id}`);
  }

  maskAsPaid(id: number): Observable<void> {
    return this._http.patch<void>(`${env.api}invoices/${id}/status`, {
      status: InvoiceStatus.PAID,
    });
  }

  editInvoice(id: number, invoiceDto: InvoiceDto): Observable<void> {
    console.log(invoiceDto);
    return this._http.put<void>(`${env.api}invoices/${id}`, invoiceDto);
  }

  createInvoice(invoiceDto: InvoiceDto): Observable<Invoice> {
    return this._http.post<Invoice>(`${env.api}invoices`, invoiceDto);
  }
}
