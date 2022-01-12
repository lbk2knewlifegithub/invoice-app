import { Invoice, User } from "@lbk/models";
import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto, UpdateInvoiceDto } from "../dto";
import { InvoicesRepo } from "../repo/invoices.repo";

@Injectable()
export class InvoicesService {
  constructor(private readonly _repo: InvoicesRepo) {}

  async createInvoice(
    user: User,
    createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    return await this._repo.createInvoice(user, createInvoiceDto);
  }

  async deleteInvoice(_id: string, user: User): Promise<void> {
    return await this._repo.deleteInvoice(_id, user);
  }

  /**
   * - Get All Invoice
   * @param user
   * @param filteredDto
   */
  async getAllInvoices(user: User): Promise<Invoice[]> {
    return await this._repo.getAllInvoices(user);
  }

  /**
   * - Get Invoice By Id
   * @param user
   * @param id
   */
  async getInvoice(_id: string, user: User): Promise<Invoice> {
    // const found = await this._repo.findInvoiceById({ where: { id, userId: user.id }, });

    // if (!found) {
    //   throw new NotFoundException(`Invoice ${id} not found;`);
    // }

    // return found;
    return {} as Invoice;
  }

  async updateInvoice(
    _id: string,
    user: User,
    updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
    throw new Error("Not implement yet");
  }
}
