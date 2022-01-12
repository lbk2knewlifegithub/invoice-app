import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

/**
 * - Auth Credential Dto
 */
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
