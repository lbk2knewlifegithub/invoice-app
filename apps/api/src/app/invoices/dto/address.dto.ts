import { Address } from "@lbk/models";
import { IsDefined, IsString, MaxLength, MinLength } from "class-validator";

export class AddressDto implements Address {
  @MinLength(5)
  @MaxLength(50)
  @IsString()
  @IsDefined()
  street: string;

  @MinLength(5)
  @MaxLength(50)
  @IsString()
  @IsDefined()
  city: string;

  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsDefined()
  postCode: string;

  @MinLength(3)
  @MaxLength(20)
  @IsString()
  @IsDefined()
  country: string;
}
