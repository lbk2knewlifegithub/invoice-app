import { JwtAuthGuard } from "@api/auth/jwt-auth.guard";
import { GetUser, UserEntity } from "@api/users";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { InvoiceDto, UpdateStatusDto } from "./dto";
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
    @GetUser() userEntity: UserEntity,
    @Body() createInvoiceDto: InvoiceDto
  ): Promise<InvoiceEntity> {
    return this._invoiceService.createInvoice(userEntity, createInvoiceDto);
  }

  @Put(":id")
  async updateInvoice(
    @Param("id") id: number,
    @GetUser() user: UserEntity,
    @Body() invoiceDto: InvoiceDto
  ): Promise<void> {
    return this._invoiceService.updateInvoice(id, user, invoiceDto);
  }

  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: number,
    @GetUser() user: UserEntity,
    @Body() updateStatusDto: UpdateStatusDto
  ): Promise<void> {
     await this._invoiceService.updateStatus(id, user, updateStatusDto);
  }

  @Delete(":id")
  async deleteInvoice(
    @GetUser() user: UserEntity,
    @Param("id") id: number
  ): Promise<void> {
    return this._invoiceService.deleteInvoice(user, id);
  }
}
