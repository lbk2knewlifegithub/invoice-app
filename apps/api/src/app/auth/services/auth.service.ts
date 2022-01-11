import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../users/services";
import { CredentialsDto } from "../dto";
import { JwtPayload } from "../models";

@Injectable()
export class AuthService {
  logger = new Logger("AuthService");

  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService
  ) {}

  async signUp(credentialsDto: CredentialsDto): Promise<void> {
    return await this._userService.signUp(credentialsDto);
  }

  /**
   * - Sign In
   * @param authCredentialDto
   */
  async login(
    authCredentialDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this._userService.validate(authCredentialDto);

    if (!username) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = { username };

    try {
      const accessToken = await this._jwtService.signAsync(payload);
      return { accessToken };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
