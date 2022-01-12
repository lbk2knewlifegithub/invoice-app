import { Address, Invoice, Item, Status } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: "invoices" })
export class InvoiceEntity implements Invoice {
  _id: string;

  @Prop({ required: true, type: Date })
  createdAt: string;

  @Prop({ required: true, type: Date })
  paymentDue: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  paymentTerms: number;

  @Prop({ required: true, type: String })
  clientName: string;

  @Prop({ required: true, type: String })
  clientEmail: string;

  @Prop({ required: true, type: String })
  status: Status;

  @Prop({ required: true, type: String })
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

// documents
export type InvoiceDocument = InvoiceEntity & Document;

// schema
export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
