import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "lbk-check-box",
  template: `
    <div class=" flex items-center">
      <input
        class="appearance-none h-4 w-4 border border-muted-900 rounded-sm bg-fill checked:bg-primary-900 checked:border-primary-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
