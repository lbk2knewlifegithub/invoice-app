import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "lbk-check-box",
  template: `
    <div class=" flex items-center group">
      <input
        class="h-4 w-4 rounded-sm border border-muted-900 bg-fill checked:bg-primary-900 checked:border-primary-600 mr-2 cursor-pointer hover:border-primary-900"
        type="checkbox"
        [id]="label"
        (click)="onClick()"
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
