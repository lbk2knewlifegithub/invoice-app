import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "@lbk/models";
import memo from "memo-decorator";

@Pipe({
  name: "totalPriceItem",
})
export class TotalPriceItemPipe implements PipeTransform {

  @memo()
  transform({ price, quantity }: Item): number {
    return price * quantity;
  }
}
