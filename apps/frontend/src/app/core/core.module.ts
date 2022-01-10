import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@frontend/shared";
import { COMPONENTS } from "./components";
import { CONTAINERS } from "./containers";

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
