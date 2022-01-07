import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { Item } from '@lbk/models';
import { FormComponent } from '@lbk/ui';

@Component({
  selector: 'lbk-invoice-item-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './invoice-item-input.component.html',
})
export class InvoiceItemInputComponent
  extends FormComponent
  implements OnDestroy
{
  @Input() item!: Item;
  @Output() delete = new EventEmitter<void>();

}
