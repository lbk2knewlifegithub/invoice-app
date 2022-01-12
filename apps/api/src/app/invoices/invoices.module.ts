import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth";
import { InvoicesController } from "./invoices.controller";
import { InvoicesRepo } from "./invoices.repo";
import { InvoicesService } from "./invoices.service";
import { AddressSchema, InvoiceSchema, ItemSchema } from "./schemas";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: "InvoiceEntity", schema: InvoiceSchema },
      { name: "AddressEntity", schema: AddressSchema },
      { name: "ItemEntity", schema: ItemSchema },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepo],
  exports: [InvoicesService, InvoicesRepo],
})
export class InvoicesModule {}
