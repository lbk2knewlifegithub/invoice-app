import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { InvoicesModule } from "./invoices/invoices.module";

@Module({
  imports: [InvoicesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
