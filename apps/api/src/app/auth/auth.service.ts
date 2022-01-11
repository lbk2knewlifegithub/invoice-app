import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CredentialsDto } from "./dto";
import { JwtPayload } from "./models";
import { UserRepository } from "./repo";

@Injectable()
export class AuthService {
  logger = new Logger("AuthService");

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp(credentialsDto: CredentialsDto): Promise<void> {
    return await this.userRepository.signUp(credentialsDto);
  }

  /**
   * - Sign In
   * @param authCredentialDto
   */
  async signIn(
    authCredentialDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUsernamePassword(
      authCredentialDto
    );

    if (!username) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = { username };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (e) {
      console.log(e);
      this.logger.debug(
        `JWT created new access token for user ${username}. Credential ${JSON.stringify(
          authCredentialDto
        )}`
      );
      throw new InternalServerErrorException();
    }
  }
}
