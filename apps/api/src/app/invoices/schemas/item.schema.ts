import { Item } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class ItemEntity implements Item {
  @Prop({ required: true, type: String, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ required: true, type: Number, min: 1, maxlength: 100_000 })
  quantity: number;

  @Prop({ required: true, type: Number, min: 1, maxlength: 100_000_000 })
  price: number;
}

// documents
export type ItemDocument = ItemEntity & Document;

// schema
export const ItemSchema = SchemaFactory.createForClass(ItemEntity);
