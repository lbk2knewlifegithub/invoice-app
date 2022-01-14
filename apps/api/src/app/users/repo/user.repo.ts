import { CredentialsDto } from "@api/auth/credentials.dto";
import { CACHE_NUMBERS_OF_INVOICES } from "@api/constants";
import { InvoiceDto, UpdateStatusDto } from "@api/invoices/dto";
import { InvoiceEntity } from "@api/invoices/schemas";
import { addDays } from "@lbk/utils";
import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { genSalt, hash } from "bcrypt";
import { Cache } from "cache-manager";
import { Model, UpdateWriteOpResult } from "mongoose";
import { UserDocument, UserEntity } from "../schemas";

/**
 * - User Repository
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly _userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER)
    private readonly _cacheManager: Cache
  ) {}

  /**
   * - Sign Up
   * @param credentialsDto
   */
  async signUp(credentialsDto: CredentialsDto): Promise<void> {
    const { password, username } = credentialsDto;

    // Generator salt
    const salt = await genSalt();

    const user = new UserEntity({
      password: await UserRepository.hashPassword(password, salt),
      username,
      salt,
    });

    try {
      // await user.save();
      await this._userModel.create(user);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(`User already exits`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * - Hash Password
   * @param password
   * @param salt
   * @private
   */
  private static async hashPassword(
    password: string,
    salt: string
  ): Promise<string> {
    return await hash(password, salt);
  }

  /**
   * - Validate Username Password
   * @param credentialsDto
   */
  async validateUsernamePassword(
    credentialsDto: CredentialsDto
  ): Promise<string | null> {
    const { password, username } = credentialsDto;

    const user = await this._userModel.findOne({ username });

    if (user && this.validatePassword(user.salt, user.password, password))
      return username;

    return null;
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this._userModel.findOne({ username });
  }

  async userExisted(username: string): Promise<boolean> {
    return !!(await this._userModel.findOne({ username }));
  }

  async validatePassword(
    salt: string,
    password1: string,
    password2: string
  ): Promise<boolean> {
    return password1 === (await hash(password2, salt));
  }

  /**
   *
   * @param username
   * @param id  - Id of invoice
   * @returns
   */
  async deleteInvoice(
    username: string,
    id: number
  ): Promise<UpdateWriteOpResult> {
    return this._userModel.updateOne(
      { username },
      {
        $unset: {
          [`invoices.${id}`]: 1,
        },
      }
    );
  }

  async createInvoice(
    { username }: UserEntity,
    createInvoiceDto: InvoiceDto
  ): Promise<InvoiceEntity> {
    // create invoice id
    const id = await this.createInvoiceId();

    const newInvoice: InvoiceEntity = new InvoiceEntity({
      ...createInvoiceDto,
      id,
      createdAt: new Date(createInvoiceDto.createdAt),
      paymentDue: this.createPaymentDue(createInvoiceDto),
    });

    await this._userModel.updateOne(
      { username },
      {
        $set: {
          [`invoices.${id}`]: newInvoice,
        },
      }
    );

    return newInvoice;
  }

  private createPaymentDue({ createdAt, paymentTerms }: InvoiceDto): Date {
    return new Date(addDays(createdAt, paymentTerms));
  }

  private async createInvoiceId(): Promise<number> {
    const length = await this._cacheManager.get(CACHE_NUMBERS_OF_INVOICES);

    if (!length) {
      const numberOfInvoices = await this.numberOfInvoices();
      await this._cacheManager.set(CACHE_NUMBERS_OF_INVOICES, numberOfInvoices);
      return numberOfInvoices;
    }

    // increment id
    const result = parseInt(length as string) + 1;
    await this._cacheManager.set(CACHE_NUMBERS_OF_INVOICES, result);
    return result;
  }

  // async patchInvoice(
  //   id: number,
  //   { username, invoices }: UserEntity,
  //   updateInvoiceDto: UpdateInvoiceDto
  // ): Promise<InvoiceEntity | undefined> {
  //   const invoice = invoices.get(id);
  //   if (!invoice) return undefined;

  //   const newInvoice = _.assignIn(
  //     (invoice as InvoiceDocument).toObject(),
  //     updateInvoiceDto
  //   );

  //   console.log(newInvoice);

  //   // When update createdAt or paymentTerms will affected to paymentDue
  //   if (updateInvoiceDto.paymentTerms || updateInvoiceDto.createdAt) {
  //     newInvoice.paymentDue = new Date(
  //       addDays(newInvoice.createdAt, newInvoice.paymentTerms)
  //     );
  //   }

  //   const result = await this._userModel.findOneAndUpdate(
  //     { username },
  //     {
  //       [`invoices.${id}`]: updateInvoiceDto,
  //     },
  //     { new: true }
  //   );
  //   console.log("fuck");
  //   console.log(result);

  //   return result!.invoices.get(id);
  // }

  async updateInvoice(
    id: number,
    { username }: UserEntity,
    invoiceDto: InvoiceDto
  ): Promise<boolean> {
    const updated = await this._userModel.updateOne(
      { username },
      {
        $set: {
          [`invoices.${id}`]: { ...invoiceDto, id },
        },
      }
    );
    return updated.modifiedCount === 1;
  }

  async updateInvoiceStatus(
    id: number,
    { username }: UserEntity,
    { status }: UpdateStatusDto
  ) {
    await this._userModel.updateOne(
      { username },
      {
        $set: {
          [`invoices.${id}.status`]: status,
        },
      }
    );
  }

  private async numberOfInvoices(): Promise<number> {
    const users = await this._userModel.find({});
    return users.reduce(
      (sum: number, user: UserDocument) => sum + user.invoices.size,
      0
    );
  }
}
