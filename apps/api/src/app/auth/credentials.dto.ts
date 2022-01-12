import { Credentials } from "@lbk/models";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CredentialsDto implements Credentials {
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  // strong of password
  // @Matches(
  //   /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
  // )
  password: string;
}
