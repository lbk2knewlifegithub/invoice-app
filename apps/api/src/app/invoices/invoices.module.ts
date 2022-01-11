import { Module } from "@nestjs/common";
import { AuthModule } from "../auth";
import { InvoicesController } from "./invoices.controller";

@Module({
  imports: [AuthModule],
  controllers: [InvoicesController],
  providers: [],
})
export class InvoicesModule {}
