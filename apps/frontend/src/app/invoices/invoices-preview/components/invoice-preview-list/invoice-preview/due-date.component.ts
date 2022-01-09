import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-payment-due",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- due date -->
    <p class="text-muted-800">Due {{ paymentDue | date: "dd-MMM-yyyy" }}</p>
    <!-- end due date -->
  `,
})
export class PaymentDueComponent {
  @Input() paymentDue!: string;
}
