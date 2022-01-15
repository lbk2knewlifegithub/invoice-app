import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { FilterDto } from "@frontend/dto";

@Component({
  selector: "lbk-filter",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./filter.component.html",
})
export class FilterComponent {
  @Input() searchStatus!: string[];
  @Output() filter = new EventEmitter<FilterDto>();
  dropDownActive = false;

  onCheckedChange({ checked, label }: { checked: boolean; label: string }) {
    this.filter.emit({ checked, status: label });
  }

  get status() {
    if (this.searchStatus.length === 0) return "status";
    return this.searchStatus.join(", ");
  }
}
