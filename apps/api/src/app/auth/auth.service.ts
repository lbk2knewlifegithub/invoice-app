import { UserService } from "@api/users/services";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CredentialsDto } from "./credentials.dto";
import { JwtPayload } from "./jwt-payload.model";

@Injectable()
export class AuthService {
  logger = new Logger("AuthService");

  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService
  ) {}

  async signUp(
    credentialsDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    await this._userService.signUp(credentialsDto);
    return {
      accessToken: await this.createAccessToken({
        username: credentialsDto.username,
      }),
    };
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

    return { accessToken: await this.createAccessToken({ username }) };
  }

  private async createAccessToken(payload: JwtPayload): Promise<string> {
    try {
      return await this._jwtService.signAsync(payload);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
