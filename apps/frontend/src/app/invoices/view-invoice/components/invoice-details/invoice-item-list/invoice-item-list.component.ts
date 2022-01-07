import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '@lbk/models';

@Component({
  selector: 'lbk-invoice-item-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-6 p-6 bg-fill">
      <ng-container *ngFor="let item of items; trackBy: identifyItem">
        <lbk-invoice-item [item]="item"></lbk-invoice-item>
      </ng-container>
    </div>
  `,
})
export class InvoiceItemListComponent {
  @Input() items!: Item[];

  identifyItem(index: number, item: Item) {
    return item.name;
  }
}
