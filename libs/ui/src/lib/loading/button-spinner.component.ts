import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-button-spinner",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [hidden]="pending">{{ text }}</span>
    <lbk-spinner [hidden]="!pending"></lbk-spinner>
  `,
})
export class ButtonSpinnerComponent {
  @Input() text!: string;
  @Input() pending!: boolean;
}
