import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Item } from "@lbk/models";

@Component({
  selector: "lbk-invoice-item-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./invoice-item-list.component.html"
})
export class InvoiceItemListComponent {
  @Input() items!: Item[];

  identifyItem(index: number, item: Item) {
    return item.name;
  }
}
