import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDto } from "./credentials.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(
    @Body() authCredentialDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    return await this.authService.signUp(authCredentialDto);
  }

  @Post("/login")
  async login(
    @Body() authCredentialDto: CredentialsDto
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialDto);
  }

  @Post("/me")
  @HttpCode(200)
  async me(@Body("accessToken") accessToken: string): Promise<void> {
    await this.authService.me(accessToken);
  }
}
