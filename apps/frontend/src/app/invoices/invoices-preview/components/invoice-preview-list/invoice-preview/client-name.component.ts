import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "lbk-client-name",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p class="text-muted-900">{{ clientName }}</p> `,
})
export class ClientNameComponent {
  @Input() clientName!: string;
}
