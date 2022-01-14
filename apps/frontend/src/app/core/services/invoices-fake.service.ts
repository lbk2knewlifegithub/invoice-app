// import { Injectable } from '@angular/core';
// import { Invoice } from '@lbk/models';
// import { map, Observable, of, tap, throwError } from 'rxjs';
// import { InvoicesService } from '.';
// import * as fromData from '../../shared/data';

// @Injectable({ providedIn: 'root' })
// export class InvoicesFakeService implements InvoicesService {
//   getInvoices(): Observable<Invoice[]> {
//     return of(fromData.invoices);
//   }

//   retrieveInvoice(id: string): Observable<Invoice> {
//     return this.getInvoices().pipe(
//       map((invoices) => invoices.find((invoice) => invoice.id === id)),
//       tap((invoice) => {
//         if (!invoice) throwError(() => 'Not founded');
//       }),
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       map((invoice) => invoice!)
//     );
//   }

//   deleteInvoice(id: string): Observable<Invoice> {
//     return this.retrieveInvoice(id);
//   }

//   maskAsPaid(id: string): Observable<Invoice> {
//     return this.retrieveInvoice(id);
//   }

//   updateInvoice(
//     id: string,
//     updateInvoiceDto: UpdateInvoiceDto
//   ): Observable<Invoice> {
//     return this.retrieveInvoice(id);
//   }

//   createInvoice(createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
//     return of({
//       id: Math.floor(Math.random() * 1000) + '',
//       ...createInvoiceDto,
//     });
//   }
// }
