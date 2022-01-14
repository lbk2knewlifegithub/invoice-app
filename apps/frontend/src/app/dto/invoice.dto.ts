import { Invoice } from "@lbk/models";
export interface InvoiceDto extends Omit<Invoice, "id"> {}
