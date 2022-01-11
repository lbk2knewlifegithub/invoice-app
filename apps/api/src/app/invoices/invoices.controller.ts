import { JwtAuthGuard } from "@api/auth";
import { GetUser } from "@api/users";
import { Invoice, User } from "@lbk/models";
import { Controller, Get, UseGuards } from "@nestjs/common";

@Controller("invoices")
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  @Get()
  async getInvoices(@GetUser() user: User): Promise<Invoice[]> {
    return [];
  }
}
