import { Address } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class AddressEntity implements Address {
  @Prop({ required: true, type: String })
  street: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  postCode: string;

  @Prop({ required: true, type: String })
  country: string;
}

// documents
export type AddressDocument = AddressEntity & Document;

// schema
export const AddressSchema = SchemaFactory.createForClass(AddressEntity);
