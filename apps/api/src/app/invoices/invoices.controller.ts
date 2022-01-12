import { JwtAuthGuard } from "@api/auth/jwt-auth.guard";
import { ObjectIdValidationPipe } from "@api/pipes";
import { GetUser, UserEntity } from "@api/users";
import { Invoice } from "@lbk/models";
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
import { CreateInvoiceDto, UpdateInvoiceDto } from "./dto";
import { InvoicesService } from "./invoices.service";
import { InvoiceEntity } from "./schemas";

@Controller("invoices")
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly _invoiceService: InvoicesService) {}

  @Get()
  async getAllInvoices(
    @GetUser() userEntity: UserEntity
  ): Promise<InvoiceEntity[]> {
    return this._invoiceService.getAllInvoices(userEntity);
  }

  @Get(":id")
  async getInvoice(
    @GetUser() userEntity: UserEntity,
    @Param("id") id: number
  ): Promise<InvoiceEntity> {
    return this._invoiceService.getInvoice(userEntity, id);
  }

  @Post()
  async createInvoice(
    @GetUser() user: UserEntity,
    @Body() createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    return await this._invoiceService.createInvoice(user, createInvoiceDto);
  }

  @Patch(":_id")
  async updateInvoice(
    @Param("_id", ObjectIdValidationPipe) _id: string,
    @GetUser() user: UserEntity,
    @Body() updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
    return await this._invoiceService.updateInvoice(
      _id,
      user,
      updateInvoiceDto
    );
  }

  @Delete(":id")
  async deleteInvoice(
    @GetUser() user: UserEntity,
    @Param("id") id: number
  ): Promise<void> {
    return this._invoiceService.deleteInvoice(user, id);
  }
}
