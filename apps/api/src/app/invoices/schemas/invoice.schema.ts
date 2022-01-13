import { Invoice, InvoiceStatus, PaymentTerms } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AddressEntity, AddressSchema } from "./address.schema";
import { ItemEntity, ItemSchema } from "./item.schema";

@Schema({ _id: false, collection: "invoices" })
export class InvoiceEntity
  implements Omit<Invoice, "createdAt" | "paymentDue">
{
  @Prop({ required: true, type: Number, unique: true })
  id: number;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  paymentDue: Date;

  @Prop({ required: true, type: String, minlength: 5, maxlength: 500 })
  description: string;

  @Prop({
    required: true,
    type: Number,
    enum: [
      PaymentTerms.ONE_DAY,
      PaymentTerms.SEVEN_DAYS,
      PaymentTerms.THIRTY_DAYS,
    ],
  })
  paymentTerms: PaymentTerms;

  @Prop({ required: true, type: String, minlength: 5, maxlength: 30 })
  clientName: string;

  @Prop({ required: true, type: String, minlength: 8, maxlength: 30 })
  clientEmail: string;

  @Prop({
    required: true,
    type: String,
    enum: [InvoiceStatus.DRAFT, InvoiceStatus.PENDING, InvoiceStatus.PAID],
  })
  status: InvoiceStatus;

  @Prop({ required: true, type: AddressSchema })
  senderAddress: AddressEntity;

  @Prop({ required: true, type: AddressSchema })
  clientAddress: AddressEntity;

  @Prop({ required: true, type: [ItemSchema] })
  items: ItemEntity[];

  @Prop({ required: true, type: Number, min: 0 })
  total: number;

  constructor(init: Partial<InvoiceEntity>) {
    Object.assign(this, init);
  }
}

// documents
export type InvoiceDocument = InvoiceEntity & Document;

// schema
export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);
