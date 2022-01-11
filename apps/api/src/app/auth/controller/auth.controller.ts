import { Body, Controller, Post } from "@nestjs/common";
import { CredentialsDto } from "../dto";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body() authCredentialDto: CredentialsDto): Promise<void> {
    return await this.authService.signUp(authCredentialDto);
  }

  @Post("/login")
  async login(
    @Body() authCredentialDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(authCredentialDto);
  }
}
