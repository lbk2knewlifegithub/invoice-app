import { InvoiceEntity, InvoiceSchema } from "@api/invoices/schemas";
import { User } from "@lbk/models";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";

@Schema({ collection: "users" })
export class UserEntity implements User {
  _id: string;

  @Prop({ required: true, type: String, unique: true })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  salt: string;

  @Prop({ required: true, of: InvoiceSchema, type: Map, default: {} })
  invoices: Map<number, InvoiceEntity>;

  // @Prop({ required: true })
  // invoices: InvoiceEntity[] = [];

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
