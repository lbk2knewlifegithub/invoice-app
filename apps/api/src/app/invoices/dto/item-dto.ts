import { Item } from "@lbk/models";
import {
  IsDefined,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

export class ItemDto implements Omit<Item, "total"> {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsDefined()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(100_000)
  @IsDefined()
  quantity: number;

  @IsNumber()
  @Min(1)
  @Max(100_000_000)
  @IsDefined()
  price: number;
}
