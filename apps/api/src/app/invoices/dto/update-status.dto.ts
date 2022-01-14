import { InvoiceStatus } from "@lbk/models";
import { IsDefined, IsEnum } from "class-validator";

export class UpdateStatusDto {
  @IsEnum(InvoiceStatus, {
    message: "InvoiceStatus must be paid, draft, pending days",
  })
  @IsDefined()
  status: InvoiceStatus;
}
