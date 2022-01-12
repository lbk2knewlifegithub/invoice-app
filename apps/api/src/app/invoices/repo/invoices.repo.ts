import { Invoice, User } from "@lbk/models";
import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "../dto";

/**
 * - Invoice Repository
 */
@Injectable()
export class InvoicesRepo {
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
  async deleteTaskById(user: User, id: number): Promise<void> {
    // const result = await this.delete({ id, userId: user.id });

    // if (result.affected === 0) {
    //   throw new NotFoundException(`Invoice width ID ${id} not found.`);
    // }

    throw new Error("Not implement yet");
  }

  async getAllInvoices(user: User): Promise<Invoice[]> {
    throw new Error("Not implement yet");
  }

  findInvoiceById() {
    throw new Error("Not implement yet");
  }
}
