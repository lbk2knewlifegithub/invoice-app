import { Item } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class ItemEntity implements Item {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  total: number;
}

// documents
export type ItemDocument = ItemEntity & Document;

// schema
export const ItemSchema = SchemaFactory.createForClass(ItemEntity);
