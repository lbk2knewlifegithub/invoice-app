import { NgModule } from "@angular/core";
import { ButtonSpinnerComponent } from "./button-spinner.component";
import { SpinnerComponent } from "./spinner.component";

const COMPONENTS = [SpinnerComponent, ButtonSpinnerComponent];
@NgModule({
  exports: COMPONENTS,
  declarations: COMPONENTS,
})
export class LoadingModule {}
