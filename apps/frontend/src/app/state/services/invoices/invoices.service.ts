import { CreateInvoiceDto, UpdateInvoiceDto } from "@frontend/dto";
import { Invoice } from "@lbk/models";
import { Observable } from "rxjs";

export interface InvoicesService {
  getInvoices(): Observable<Invoice[]>;

  retrieveInvoice(id: number): Observable<Invoice>;

  deleteInvoice(id: number): Observable<void>;

  maskAsPaid(id: number): Observable<void>;

  updateInvoice(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto
  ): Observable<void>;

  createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice>;
}
