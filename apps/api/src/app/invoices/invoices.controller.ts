import { Invoice } from "@lbk/models";
import { Controller, Get } from "@nestjs/common";

@Controller("/invoices")
export class InvoicesController {

  @Get("/")
  async getInvoices(): Promise<Invoice[]> {
    return [];
  }
}
