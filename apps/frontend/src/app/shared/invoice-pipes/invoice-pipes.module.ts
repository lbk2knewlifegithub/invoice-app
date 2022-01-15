import { NgModule } from "@angular/core";
import { TotalPriceInvoicePipe, TotalPriceItemPipe } from "./pipes";

export const PIPES = [TotalPriceInvoicePipe, TotalPriceItemPipe];

@NgModule({
  declarations: [PIPES],
  providers: [PIPES],
  exports: [PIPES],
})
export class InvoicePipesModule {}
