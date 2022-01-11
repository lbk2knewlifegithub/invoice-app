import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from "bcrypt";

@Schema()
export class User {
  _id: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  salt: string;

  // tasks: Task[];

  constructor(init: Partial<User>) {
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
export type UserDocument = User & Document;

// schema
export const UserSchema = SchemaFactory.createForClass(User);
