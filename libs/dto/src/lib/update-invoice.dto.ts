/* eslint-disable @typescript-eslint/no-empty-interface */
import { Invoice } from '@lbk/models';
export interface UpdateInvoiceDto extends Omit<Invoice, 'id'> {}
