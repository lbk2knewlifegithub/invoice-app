import { InvoiceEntity, InvoiceSchema } from "@api/invoices/schemas";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";

@Schema({ collection: "users" })
export class UserEntity {
  _id: string;

  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  salt: string;

  @Prop({ required: true, type: Map, of: InvoiceSchema })
  invoices: { [key: string]: InvoiceEntity } = {};

  constructor(init: Partial<UserEntity>) {
    Object.assign(this, init);
  }

  /**
   * - Validate Password
   * @param password
   */
  async validatePassword(password: string): Promise<boolean> {
    return this.password === (await hash(password, this.salt));
  }
}

// documents
export type UserDocument = UserEntity & Document;

// schema
export const UserSchema = SchemaFactory.createForClass(UserEntity);
