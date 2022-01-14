import { CreateInvoiceDto, UpdateInvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { Observable } from "rxjs";

export interface InvoicesService {
  getInvoices(): Observable<Invoice[]>;

  retrieveInvoice(id: number): Observable<Invoice>;

  deleteInvoice(id: number): Observable<Invoice[]>;
  maskAsPaid(id: number): Observable<Invoice[]>;

  updateInvoice(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto
  ): Observable<Invoice[]>;

  createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice>;
}
