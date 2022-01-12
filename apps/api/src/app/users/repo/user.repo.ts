import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { genSalt, hash } from "bcrypt";
import { Model } from "mongoose";
import { CredentialsDto } from "../../auth/dto";
import { UserDocument, UserEntity } from "../schemas";

/**
 * - User Repository
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel("UserEntity")
    private readonly _userModel: Model<UserDocument>
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
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictException(`User already exits`);
      } else {
        console.log(e);
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
    return await this._userModel.findOne({ username });
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
}
