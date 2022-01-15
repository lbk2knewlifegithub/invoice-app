import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownComponent } from "./dropdown.component";


@NgModule({
  imports: [CommonModule],
  exports: [DropdownComponent],
  declarations: [DropdownComponent],
})
export class DropdownModule {}
