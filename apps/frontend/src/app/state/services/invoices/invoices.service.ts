import { InvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { Observable } from "rxjs";

export interface InvoicesService {
  getInvoices(): Observable<Invoice[]>;

  retrieveInvoice(id: number): Observable<Invoice>;

  deleteInvoice(id: number): Observable<void>;

  maskAsPaid(id: number): Observable<void>;

  editInvoice(id: number, invoiceDto: InvoiceDto): Observable<void>;

  createInvoice(createInvoiceDto: InvoiceDto): Observable<Invoice>;
}
