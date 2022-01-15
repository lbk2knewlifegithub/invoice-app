import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "lbk-invoices-preview-page-loading",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="fixed inset-0 grid w-full h-full bg-white/90 place-content-center duration-300"
    >
      <app-fingerprint-spinner
        [animationDuration]="1500"
        [size]="100"
        [color]="'hsl(252, 94%, 67%)'"
      ></app-fingerprint-spinner>
    </div>
  `,
})
export class InvoicesPreviewPageLoadingComponent {}
