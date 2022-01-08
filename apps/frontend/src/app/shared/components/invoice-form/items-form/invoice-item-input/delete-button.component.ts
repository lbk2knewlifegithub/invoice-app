import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-delete-invoice-item-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button>
      <span class="fas fa-trash text-muted-900 text-lg"></span>
    </button>
  `,
})
export class DeleteButtonComponent {}
