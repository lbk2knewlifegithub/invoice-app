import { NgModule } from "@angular/core";
import { ButtonSpinnerComponent } from "./button-spinner.component";
import { CircleSpinnerComponent } from "./circle-spinner.component";

const COMPONENTS = [CircleSpinnerComponent, ButtonSpinnerComponent];
@NgModule({
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class LoadingModule {}
