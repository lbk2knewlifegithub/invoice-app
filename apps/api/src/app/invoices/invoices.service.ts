import { UserDocument, UserEntity } from "@api/users";
import { UserRepository } from "@api/users/repo";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoiceDto, UpdateStatusDto } from "./dto";
import { InvoiceDocument, InvoiceEntity } from "./schemas";

@Injectable()
export class InvoicesService {
  constructor(private readonly _repo: UserRepository) {}

  async getAllInvoices(userEntity: UserEntity): Promise<InvoiceEntity[]> {
    const formatted = (userEntity as UserDocument).toObject();
    const invoices = formatted.invoices.values();

    let result = [];

    while (true) {
      const { value, done } = invoices.next();
      if (done) break;
      result.push(value.toObject());
    }

    console.log(result);
    return result;
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

  async updateStatus(
    id: number,
    userEntity: UserEntity,
    updateStatusDto: UpdateStatusDto
  ): Promise<void> {
    // check invoice existed
    await this.getInvoice(userEntity, id);

    await this._repo.updateInvoiceStatus(id, userEntity, updateStatusDto);
  }
}
