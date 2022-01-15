import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LogoModule } from "@frontend/shared";
import { COMPONENTS } from "./components";
import { CONTAINERS } from "./containers";

@NgModule({
  imports: [CommonModule, RouterModule, LogoModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
