import { Pipe, PipeTransform } from "@angular/core";
import { Item } from "@lbk/models";
import memo from "memo-decorator";

@Pipe({
  name: "totalPriceItem",
})
export class TotalPriceItemPipe implements PipeTransform {
  @memo()
  transform(item: Item): number {
    const { price, quantity } = item;
    return parseFloat(price.toString()) * parseFloat(quantity.toString());
  }
}
