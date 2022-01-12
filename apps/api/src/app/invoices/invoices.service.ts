import { Invoice, User } from "@lbk/models";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInvoiceDto, UpdateInvoiceDto } from "./dto";
import { InvoicesRepo } from "./invoices.repo";

@Injectable()
export class InvoicesService {
  constructor(private readonly _repo: InvoicesRepo) {}

  async getAllInvoices(user: User): Promise<Invoice[]> {
    return await this._repo.getAllInvoices(user);
  }

  async createInvoice(
    user: User,
    createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    return await this._repo.createInvoice(user, createInvoiceDto);
  }

  async deleteInvoice(_id: string, user: User): Promise<void> {
    return await this._repo.deleteInvoice(_id, user);
  }

  async getInvoice(_id: string): Promise<Invoice> {
    const found = await this._repo.findInvoiceById(_id);
    if (!found) throw new NotFoundException(`Invoice ${_id} not found;`);
    return found;
  }

  async updateInvoice(
    _id: string,
    user: User,
    updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
    return this._repo.updateInvoice(_id, user, updateInvoiceDto);
  }
}
