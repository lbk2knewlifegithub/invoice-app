import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ScrollToDirective } from "./scroll-to.directive";


@NgModule({
  imports: [CommonModule],
  exports: [ScrollToDirective],
  declarations: [ScrollToDirective],
})
export class ScrollToModule {}
