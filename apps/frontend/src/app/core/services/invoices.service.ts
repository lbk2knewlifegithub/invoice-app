import { CreateInvoiceDto, UpdateInvoiceDto } from '@lbk/dto';
import { Invoice } from '@lbk/models';
import { Observable } from 'rxjs';

export interface InvoicesService {
  getInvoices(): Observable<Invoice[]>;

  retrieveInvoice(id: string): Observable<Invoice>;

  deleteInvoice(id: string): Observable<Invoice>;
  maskAsPaid(id: string): Observable<Invoice>;

  updateInvoice(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto
  ): Observable<Invoice>;
  createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice>;
}
