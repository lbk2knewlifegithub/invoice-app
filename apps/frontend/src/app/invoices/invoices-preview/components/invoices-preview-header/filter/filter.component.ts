import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from "@angular/core";
import { FilterDto } from "@lbk/dto";

@Component({
  selector: "lbk-filter",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./filter.component.html",
})
export class FilterComponent {
  @Output() filter = new EventEmitter<FilterDto>();
  dropDownActive = false;

  onCheckedChange({ checked, label }: { checked: boolean; label: string }) {
    this.filter.emit({ checked, status: label });
  }
}
