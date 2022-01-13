import { CredentialsDto } from "@api/auth/credentials.dto";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repo";
import { UserEntity } from "../schemas";

@Injectable()
export class UserService {
  constructor(private readonly _repo: UserRepository) {}

  async signUp(credentialsDto: CredentialsDto): Promise<void> {
    return this._repo.signUp(credentialsDto);
  }

  async validate(credentialsDto: CredentialsDto): Promise<string | null> {
    return this._repo.validateUsernamePassword(credentialsDto);
  }

  async findByUserName(username: string): Promise<UserEntity | undefined> {
    return this._repo.findByUsername(username);
  }
  async userExisted(username: string): Promise<boolean> {
    return this._repo.userExisted(username);
  }
}
