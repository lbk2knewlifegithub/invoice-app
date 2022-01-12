import { Invoice, Status } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AddressEntity } from "./address.schema";
import { ItemEntity } from "./item.schema";

@Schema()
export class InvoiceEntity implements Invoice {
  _id: string;

  @Prop({ required: true, type: Date })
  createdAt: string;

  @Prop({ required: true, type: String })
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

  @Prop({ required: true, type: AddressEntity })
  senderAddress: AddressEntity;

  @Prop({ required: true, type: AddressEntity })
  clientAddress: AddressEntity;

  @Prop({ required: true, type: ItemEntity })
  items: ItemEntity[];

  @Prop({ required: true, type: Number })
  total: number;
}

// documents
export type InvoiceDocument = InvoiceEntity & Document;

// schema
export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
