import { Invoice, InvoiceStatus, PaymentTerms } from "@lbk/models";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested
} from "class-validator";
import { AddressDto } from "./address.dto";
import { ItemDto } from "./item-dto";

export class InvoiceDto
  implements
    Omit<Invoice, "id" | "paymentDue" | "items" | "total" | "createdAt">
{
  @IsDateString()
  @IsDefined()
  createdAt: string;

  // paymentDue: string;
  @MinLength(5)
  @MaxLength(500)
  @IsDefined()
  description: string;

  @IsEnum(PaymentTerms, { message: "Payment terms must be 1, 7, 30 days" })
  @IsDefined()
  paymentTerms: PaymentTerms;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsDefined()
  clientName: string;

  @IsEmail()
  @IsDefined()
  clientEmail: string;

  @IsEnum(InvoiceStatus, {
    message: "InvoiceStatus must be paid, draft, pending days",
  })
  @IsDefined()
  status: InvoiceStatus;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsDefined()
  senderAddress: AddressDto;

  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @IsDefined()
  clientAddress: AddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @IsDefined()
  items: ItemDto[] = [];
}
