import { UserEntity } from "@api/users";
import { Invoice, User } from "@lbk/models";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateInvoiceDto, UpdateInvoiceDto } from "./dto";
import { InvoiceDocument, InvoiceEntity } from "./schemas";

/**
 * - Invoice Repository
 */
@Injectable()
export class InvoicesRepo {
  constructor(
    @InjectModel(InvoiceEntity.name)
    private readonly _invoiceModel: Model<InvoiceDocument>
  ) {}

  async createInvoice(
    user: User,
    createInvoiceDto: CreateInvoiceDto
  ): Promise<Invoice> {
    // const { description, title } = createInvoiceDto;

    // // Create new task without save to database
    // const task = new Invoice({ description, title });
    // task.user = user;

    // // Save task to database
    // await task.save();

    // return task;
    throw new Error("Not implement yet");
  }

  /**
   * - Delete Invoice By Id
   * @param user
   * @param id
   */
  async deleteInvoice(userEntity: UserEntity, id: number): Promise<void> {
    // const result = await this.({ id, userId: user.id });

    // if (result.affected === 0) {
    //   throw new NotFoundException(`Invoice width ID ${id} not found.`);
    // }
    throw new Error("Not implement yet");
  }

  async getAllInvoices(userEntity: UserEntity): Promise<Invoice[]> {
    throw new Error("Not implement yet");
  }

  async findInvoiceById(_id: string): Promise<Invoice | undefined> {
    throw new Error("Not implement yet");
  }

  async updateInvoice(
    _id: string,
    user: User,
    updateInvoiceDto: UpdateInvoiceDto
  ): Promise<Invoice> {
    throw new Error("Not implement yet");
  }
}
