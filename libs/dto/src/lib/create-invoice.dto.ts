/* eslint-disable @typescript-eslint/no-empty-interface */
import { Invoice } from '@lbk/models';

export interface CreateInvoiceDto extends Omit<Invoice, 'id'> {}
