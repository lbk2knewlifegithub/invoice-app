import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateInvoiceDto, UpdateInvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { Observable, of } from "rxjs";
import { InvoicesService } from "..";

@Injectable({ providedIn: "root" })
export class InvoicesImplService implements InvoicesService {
  constructor(private readonly _http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return of([]);
  }

  retrieveInvoice(id: number): Observable<Invoice> {
    throw new Error("");
  }

  deleteInvoice(id: number): Observable<Invoice[]> {
    return of([]);
  }

  maskAsPaid(id: number): Observable<Invoice[]> {
    return of([]);
  }

  updateInvoice(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto
  ): Observable<Invoice[]> {
    return of([]);
  }

  createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
    throw Error();
  }
}
