import { Invoice } from "@lbk/models";

export class UpdateInvoiceDto implements Partial<Omit<Invoice, "_id">> {}
