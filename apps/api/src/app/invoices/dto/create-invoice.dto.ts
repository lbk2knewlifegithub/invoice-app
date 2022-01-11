import { Address, Invoice, Item, Status } from "@lbk/models";

export class CreateInvoiceDto implements Omit<Invoice, "_id"> {
  code: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: Status;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}
