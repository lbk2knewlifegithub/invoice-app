import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-new-invoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button data-cy="new-invoice-button" class="bg-primary-900 rounded-full flex items-center gap-2 p-[6px] ">
      <!-- plus -->
      <div class="w-8 h-8 bg-white rounded-full grid place-content-center">
        <span class="fas fa-plus text-primary-900"></span>
      </div>
      <!-- end plus -->

      <h4 class="text-white mr-2">New</h4>

    </button>
  `,
})
export class NewInvoiceComponent {}
