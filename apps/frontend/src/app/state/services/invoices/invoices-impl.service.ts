import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InvoiceDto } from "@frontend/dto";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { map, Observable } from "rxjs";
import { InvoicesService } from "..";

@Injectable({ providedIn: "root" })
export class InvoicesImplService implements InvoicesService {
  constructor(private readonly _http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this._http
      .get<{ [key: string]: Invoice }>("/api/invoices")
      .pipe(map((res) => Object.values(res)));
  }

  retrieveInvoice(id: number): Observable<Invoice> {
    return this._http.get<Invoice>(`/api/invoices/${id}`);
  }

  deleteInvoice(id: number): Observable<void> {
    return this._http.delete<void>(`/api/invoices/${id}`);
  }

  maskAsPaid(id: number): Observable<void> {
    return this._http.patch<void>(`/api/invoices/${id}/status`, {
      status: InvoiceStatus.PAID,
    });
  }

  updateInvoice(id: number, invoiceDto: InvoiceDto): Observable<void> {
    console.log(id);
    console.log(invoiceDto);
    return this._http.put<void>(`/api/invoices/${id}`, invoiceDto);
  }

  createInvoice(invoiceDto: InvoiceDto): Observable<Invoice> {
    return this._http.post<Invoice>("/api/invoices", invoiceDto);
  }
}
