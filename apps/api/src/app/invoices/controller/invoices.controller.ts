import { JwtAuthGuard } from "@api/auth";
import { ObjectIdValidationPipe } from "@api/pipes";
import { GetUser } from "@api/users";
import { Invoice, User } from "@lbk/models";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { CreateInvoiceDto, UpdateInvoiceDto } from "../dto";
import { InvoicesService } from "../services";

@Controller("/invoices")
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly _invoiceService: InvoicesService) {}

  @Get("/")
  async getAllInvoices(@GetUser() user: User): Promise<Invoice[]> {
    return await this._invoiceService.getAllInvoices(user);
  }

  @Get(":_id")
  async getInvoice(
    @Param("_id", ObjectIdValidationPipe) _id: string
  ): Promise<Invoice> {
    return await this._invoiceService.getInvoice(_id);
  }

  @Post()
  async createInvoice(
    @GetUser() user: User,
    @Body() createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    return await this._invoiceService.createInvoice(user, createInvoiceDto);
  }

  @Patch(":_id")
  async updateInvoice(
    @Param("_id", ObjectIdValidationPipe) _id: string,
    @GetUser() user: User,
    @Body() updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
    return await this._invoiceService.updateInvoice(
      _id,
      user,
      updateInvoiceDto
    );
  }

  @Delete(":_id")
  async deleteInvoice(
    @Param("_id", ObjectIdValidationPipe) _id: string,
    @GetUser() user: User
  ): Promise<void> {
    return await this._invoiceService.deleteInvoice(_id, user);
  }
}
