import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Output
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormGroupComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-items-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div [formArrayName]="arrayName">
        <!-- title -->
        <h3 class="text-muted-900">Item List</h3>
        <!-- end title -->

        <lbk-invoice-item-form-list
          class="block mt-6"
          (delete)="delete.emit($event)"
          [arrayName]="arrayName"
          (addNewItem)="addNewItem.emit()"
          [parent]="parent"
          [items]="items"
        ></lbk-invoice-item-form-list>
      </div>
    </div>
  `,
})
export class ItemsFormComponent extends FormGroupComponent {
  @Output() delete = new EventEmitter<number>();
  @Output() addNewItem = new EventEmitter<void>();

  get items(): FormGroup[] {
    return (this.parent.get('items') as FormArray).controls as FormGroup[];
  }
}
