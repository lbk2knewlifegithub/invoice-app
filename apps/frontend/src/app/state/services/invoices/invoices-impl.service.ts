import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateInvoiceDto, UpdateInvoiceDto } from "@frontend/dto";
import { Invoice, InvoiceStatus } from "@lbk/models";
import { Observable } from "rxjs";
import { InvoicesService } from "..";

@Injectable({ providedIn: "root" })
export class InvoicesImplService implements InvoicesService {
  constructor(private readonly _http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this._http.get<Invoice[]>("/api/invoices");
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

  updateInvoice(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto
  ): Observable<void> {
    return this._http.put<void>(`/api/invoices/${id}`, updateInvoiceDto);
  }

  createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
    return this._http.post<Invoice>("/api/invoices", createInvoiceDto);
  }
}
