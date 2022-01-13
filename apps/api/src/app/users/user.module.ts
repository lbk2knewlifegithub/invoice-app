import { SharedModule } from "@api/shared.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "./repo";
import { UserSchema } from "./schemas";
import { UserService } from "./services";

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: "UserEntity", schema: UserSchema }]),
    // InvoicesModule,
  ],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
