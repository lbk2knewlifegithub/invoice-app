import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { TotalPriceItemPipe } from "@frontend/shared/invoice-pipes/pipes";
import { Item } from "@lbk/models";
import { map, Observable, startWith } from "rxjs";
import { FormGroupComponent } from "../../form-helper/form-group.component";

@Component({
  selector: "lbk-invoice-item-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./invoice-item-input.component.html",
})
export class InvoiceItemInputComponent
  extends FormGroupComponent
  implements OnInit
{
  @Output() delete = new EventEmitter<void>();

  quantityFormControl!: FormControl;
  priceFormControl!: FormControl;
  total$!: Observable<number>;

  constructor(private readonly _totalPriceItemPipe: TotalPriceItemPipe) {
    super();
  }
  ngOnInit(): void {
    const itemFormGroup = this.parent
      .get("items")
      ?.get(this.groupName) as FormGroup;

    this.total$ = itemFormGroup.valueChanges.pipe(
      startWith(itemFormGroup.value),
      map((item) => this.calculateTotal(item))
    );
  }

  private calculateTotal(item: Item) {
    return this._totalPriceItemPipe.transform(item);
  }
}
