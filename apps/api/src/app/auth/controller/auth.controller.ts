import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CredentialsDto } from "../dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body() authCredentialDto: CredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialDto);
  }

  @Post("/login")
  async signIn(
    @Body() authCredentialDto: CredentialsDto
  ): Promise<{ accessToken: string }> {


    return await this.authService.login(authCredentialDto);
  }
}
