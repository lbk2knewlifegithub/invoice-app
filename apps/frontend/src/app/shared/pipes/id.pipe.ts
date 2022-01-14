import { DecimalPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "id",
})
export class IdPipe implements PipeTransform {
  constructor(private readonly _decimalPipe: DecimalPipe) {}

  transform(value: number) {
    return this._decimalPipe.transform(value, "5");
  }
}
