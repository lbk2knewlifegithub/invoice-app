import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth";
import { InvoicesController } from "./controller/invoices.controller";
import { InvoicesRepo } from "./repo/invoices.repo";
import { AddressSchema, InvoiceSchema, ItemSchema } from "./schemas";
import { InvoicesService } from "./services";

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: "Invoice", schema: InvoiceSchema },
      { name: "Address", schema: AddressSchema },
      { name: "Item", schema: ItemSchema },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepo],
  exports: [InvoicesService, InvoicesRepo],
})
export class InvoicesModule {}
