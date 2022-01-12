import {
  BadRequestException, Injectable, PipeTransform
} from "@nestjs/common";
import { isValidObjectId } from "mongoose";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string) {
    const valid = isValidObjectId(value);
    if (valid) {
      throw new BadRequestException(`Id ${value} invalid.`);
    }
    return value;
  }
}
