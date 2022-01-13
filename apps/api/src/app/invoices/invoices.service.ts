import { UserEntity } from "@api/users";
import { UserRepository } from "@api/users/repo";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceDto } from "./dto";
import { InvoiceDocument, InvoiceEntity } from "./schemas";

@Injectable()
export class InvoicesService {
  constructor(private readonly _repo: UserRepository) {}

  async getAllInvoices(userEntity: UserEntity): Promise<InvoiceEntity[]> {
    const invoices = userEntity.invoices as Map<number, InvoiceDocument>;
    return Array.from(invoices.values());
  }

  async createInvoice(
    user: UserEntity,
    createInvoiceDto: InvoiceDto
  ): Promise<InvoiceEntity> {
    return this._repo.createInvoice(user, createInvoiceDto);
  }

  async deleteInvoice(userEntity: UserEntity, id: number): Promise<void> {
    const { modifiedCount } = await this._repo.deleteInvoice(
      userEntity.username,
      id
    );

    if (modifiedCount === 0) {
      throw new NotFoundException();
    }
  }

  async getInvoice(userEntity: UserEntity, id: number): Promise<InvoiceEntity> {
    const found = userEntity.invoices.get(id);
    if (!found) throw new NotFoundException();
    return (found as InvoiceDocument).toObject();
  }

  async updateInvoice(
    id: number,
    userEntity: UserEntity,
    invoiceDto: InvoiceDto
  ): Promise<void> {
    const found = userEntity.invoices.get(id);
    if (!found) throw new NotFoundException();

    const updated = await this._repo.updateInvoice(id, userEntity, invoiceDto);

    if (!updated) throw new NotFoundException();
  }
}
