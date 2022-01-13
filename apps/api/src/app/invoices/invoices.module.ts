import { UsersModule } from "@api/users";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth";
import { InvoicesController } from "./invoices.controller";
import { InvoicesService } from "./invoices.service";
import {
  AddressEntity,
  AddressSchema,
  InvoiceEntity,
  InvoiceSchema,
  ItemEntity,
  ItemSchema
} from "./schemas";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: InvoiceEntity.name, schema: InvoiceSchema },
      { name: AddressEntity.name, schema: AddressSchema },
      { name: ItemEntity.name, schema: ItemSchema },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
