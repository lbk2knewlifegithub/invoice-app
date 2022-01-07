import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-no-invoices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid place-content-center">
      <img src="assets/illustration-empty.svg" alt="Empty" />

      <div class="text-center mt-10">
        <h2>There is nothing here</h2>
        <p class="text-muted-900 mt-6">
          Create on invoice by clicking the <br />
          <strong>New </strong>button and get started
        </p>
      </div>
    </div>
  `,
})
export class NoInvoicesComponent {}
