import { Invoice, Status } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AddressEntity, AddressSchema } from "./address.schema";
import { ItemEntity, ItemSchema } from "./item.schema";

@Schema({ _id: false, collection: "invoices" })
export class InvoiceEntity implements Invoice {
  @Prop({ required: true, type: Number })
  id: number;

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

  @Prop({ type: AddressSchema })
  senderAddress: AddressEntity;

  @Prop({ type: AddressSchema })
  clientAddress: AddressEntity;

  @Prop({ required: true, type: [ItemSchema] })
  items: ItemEntity[];

  @Prop({ required: true, type: Number })
  total: number;
}

// documents
export type InvoiceDocument = InvoiceEntity & Document;

// schema
export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
