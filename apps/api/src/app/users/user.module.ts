import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "./repo";
import { UserSchema } from "./schemas";
import { UserService } from "./services";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "UserEntity", schema: UserSchema }]),
    // InvoicesModule,
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
