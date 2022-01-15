import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lbk-delete-invoice-item-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button>
      <span
        class="fas fa-trash text-muted-900 duration-500 text-lg hover:text-primary-900 dark:text-muted-700 hover:dark:text-primary-900"
      ></span>
    </button>
  `,
})
export class DeleteButtonComponent {}
