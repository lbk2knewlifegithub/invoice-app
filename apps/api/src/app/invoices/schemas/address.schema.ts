import { Address } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class AddressEntity implements Address {
  @Prop({ required: true, type: String, minlength: 5, maxlength: 50 })
  street: string;

  @Prop({ required: true, type: String, minlength: 5, maxlength: 50 })
  city: string;

  @Prop({ required: true, type: String, minlength: 3, maxlength: 20 })
  postCode: string;


  @Prop({ required: true, type: String, minlength: 3, maxlength: 20 })
  country: string;
}

export type AddressDocument = AddressEntity & Document;

export const AddressSchema = SchemaFactory.createForClass(AddressEntity);
