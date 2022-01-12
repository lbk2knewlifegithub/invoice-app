import { Invoice, User } from "@lbk/models";
import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "../dto";
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

  async deleteInvoiceById(user: User, id: number): Promise<void> {
    await this._repo.deleteTaskById(user, id);
    return;
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
  async getInvoiceById(user: User, id: string): Promise<Invoice> {
    // const found = await this._repo.findInvoiceById({ where: { id, userId: user.id }, });

    // if (!found) {
    //   throw new NotFoundException(`Invoice ${id} not found;`);
    // }

    // return found;
    return {} as Invoice;
  }
}
