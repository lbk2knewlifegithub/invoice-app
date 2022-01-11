import { Injectable } from "@nestjs/common";
import { User } from "..";
import { CredentialsDto } from "../../auth/dto";
import { UserRepository } from "../repo";

@Injectable()
export class UserService {
  constructor(private readonly _repo: UserRepository) {}

  async signUp(credentialsDto: CredentialsDto): Promise<void> {
    return this._repo.signUp(credentialsDto);
  }

  async validate(credentialsDto: CredentialsDto): Promise<string | null> {
    return this._repo.validateUsernamePassword(credentialsDto);
  }

  async findByUserName(username: string): Promise<User | undefined> {
    return this._repo.findByUsername(username);
  }
}
