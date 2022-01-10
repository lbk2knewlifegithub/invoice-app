import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "lbk-check-box",
  template: `
    <div class=" flex items-center group">
      <input
        class="h-4 w-4 rounded-sm border text-primary-900 border-muted-900 mr-2 cursor-pointer checked:text-primary-900 checked:bg-primary-900 focus:ring-0 dark:border-primary-900"
        type="checkbox"
        (click)="onClick()"
        [id]="label"
        [checked]="checked"
      />

      <label class="inline-block cursor-pointer" [for]="label">
        {{ label | titlecase }}
      </label>
    </div>
  `,
})
export class CheckboxComponent {
  @Input() label!: string;
  @Input() checked!: boolean;
  @Output() checkedChange = new EventEmitter<{
    checked: boolean;
    label: string;
  }>();

  onClick() {
    this.checked = !this.checked;
    this.checkedChange.emit({ checked: this.checked, label: this.label });
  }
}
