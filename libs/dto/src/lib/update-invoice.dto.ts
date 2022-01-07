import { Invoice } from '@lbk/models';
export interface UpdateInvoiceDto extends Omit<Invoice, 'id'> {}
