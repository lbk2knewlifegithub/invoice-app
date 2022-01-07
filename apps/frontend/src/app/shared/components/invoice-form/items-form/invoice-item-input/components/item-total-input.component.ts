import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormComponent } from '@lbk/ui';
import { combineLatestWith, of } from 'rxjs';

@Component({
  selector: 'lbk-item-total-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-input-array
      [parent]="parent"
      [groupName]="groupName"
      [arrayName]="arrayName"
      [disabled]="true"
      controlName="total"
      placeHolder="100"
      label="Total"
    ></lbk-input-array>
  `,
})
export class ItemTotalInputComponent
  extends FormComponent
  implements OnInit, OnDestroy
{
  ngOnInit(): void {
    this.appendSub = this.quantity.valueChanges
      .pipe(combineLatestWith(of(this.price.value)))
      .subscribe(([quantity, price]) => {
        this.setTotal(quantity, price);
      });

    this.appendSub = this.price.valueChanges
      .pipe(combineLatestWith(of(this.quantity.value)))
      .subscribe(([price, quantity]) => {
        this.setTotal(quantity, price);
      });
  }

  setTotal(price: number, quantity: number) {
    this.current.setValue(price * quantity);
  }

  get current(): FormControl {
    return this.itemGroup.get('total') as FormControl;
  }

  get itemGroup(): FormGroup {
    return this.items.get(this.groupName + '') as FormGroup;
  }

  get price(): FormControl {
    return this.itemGroup.get('price') as FormControl;
  }

  get quantity(): FormControl {
    return this.itemGroup.get('quantity') as FormControl;
  }

  get items(): FormArray {
    return this.parent.get('items') as FormArray;
  }
}
