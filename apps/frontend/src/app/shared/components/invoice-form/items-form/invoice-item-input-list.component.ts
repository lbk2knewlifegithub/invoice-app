import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-invoice-item-form-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="parent">
      <div class="grid gap-12" [formArrayName]="arrayName">
        <ng-container
          *ngFor="let item of items; index as i; trackBy: identifyItem"
        >
          <lbk-invoice-item-input
            (delete)="delete.emit(i)"
            [arrayName]="arrayName"
            [parent]="parent"
            [groupName]="i"
          ></lbk-invoice-item-input>
        </ng-container>

        <lbk-add-new-item (click)="addNewItem.emit()"></lbk-add-new-item>
      </div>
    </div>
  `,
})
export class InvoiceItemInputListComponent
  extends FormComponent
  implements OnDestroy
{
  @Input() items!: FormGroup[];
  @Output() addNewItem = new EventEmitter<void>();

  @Output() delete = new EventEmitter<number>();

  identifyItem(index: number, formGroup: FormGroup) {
    return index;
  }
}
