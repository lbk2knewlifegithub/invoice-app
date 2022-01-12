import { UserEntity } from "@api/users";
import { UserRepository } from "@api/users/repo";
import { Invoice, User } from "@lbk/models";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInvoiceDto, UpdateInvoiceDto } from "./dto";
import { InvoiceEntity } from "./schemas";

@Injectable()
export class InvoicesService {
  constructor(private readonly _repo: UserRepository) {}

  async getAllInvoices(userEntity: UserEntity): Promise<InvoiceEntity[]> {
    return Array.from(userEntity.invoices.values());
  }

  async createInvoice(
    user: User,
    createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    throw new Error("Not implement yet");
    // return await this._repo.createInvoice(user, createInvoiceDto);
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
    return found;
  }

  async updateInvoice(
    _id: string,
    user: User,
    updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
    throw new Error("Not implement yet");
    // return this._repo.updateInvoice(_id, user, updateInvoiceDto);
  }
}
