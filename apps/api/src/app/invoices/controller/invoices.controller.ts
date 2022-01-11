import { JwtAuthGuard } from "@api/auth";
import { GetUser } from "@api/users";
import { Invoice, User } from "@lbk/models";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { InvoicesService } from "..";
import { CreateInvoiceDto } from "../dto";

@Controller("invoices")
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly _invoiceService: InvoicesService) {}

  @Get()
  async getInvoices(@GetUser() user: User): Promise<Invoice[]> {
    return await this._invoiceService.getAllInvoices(user);
  }

  @Get(":id")
  async getInvoiceById(
    @Param("id") id: string,
    @GetUser() user: User
  ): Promise<Invoice> {
    return await this._invoiceService.getInvoiceById(user, id);
  }

  /**
   * - Create new task
   * @param createTaskDto
   * @param user
   */
  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @GetUser() user: User
  ): Promise<Invoice> {
    return await this._invoiceService.createInvoice(user, createInvoiceDto);
  }

  /**
   * - Delete task by id
   */
  @Delete(":id")
  async deleteInvoiceById(
    @GetUser() user: User,
    @Param("id") id: number
  ): Promise<void> {
    return await this._invoiceService.deleteInvoiceById(user, id);
  }
}
