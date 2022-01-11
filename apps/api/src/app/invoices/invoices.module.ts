import { Module } from "@nestjs/common";
import { InvoicesService } from ".";
import { AuthModule } from "../auth";
import { InvoicesController } from "./controller/invoices.controller";
import { InvoicesRepo } from "./repo/invoices.repo";

@Module({
  imports: [AuthModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepo],
})
export class InvoicesModule {}
