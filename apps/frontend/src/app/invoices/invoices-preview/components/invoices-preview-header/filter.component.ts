import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { FilterDto } from '@lbk/dto';

@Component({
  selector: 'lbk-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <lbk-dropdown [(active)]="dropDownActive">
    <button class="flex items-center gap-3 button">
      <h4 class="font-bold">Filter</h4>

      <!-- arrow icon -->
      <img
        [class.rotate-180]="dropDownActive"
        class="duration-300"
        src="assets/icon-arrow-down.svg"
        alt="Arrow down"
      />
      <!-- end arrow icon -->
    </button>

    <ul class="inline-grid gap-2 bg-white p-2 rounded-md shadow-lg">
      <!-- filter by paid -->
      <lbk-check-box
        (checkedChange)="onCheckedChange($event)"
        label="paid"
      ></lbk-check-box>
      <!-- end filter by paid -->

      <!-- filter by pending -->
      <lbk-check-box
        (checkedChange)="onCheckedChange($event)"
        label="pending"
      ></lbk-check-box>
      <!-- end filter by pending -->

      <!-- filter by draft -->
      <lbk-check-box
        (checkedChange)="onCheckedChange($event)"
        label="draft"
      ></lbk-check-box>
      <!-- end filter by draft -->
    </ul>
  </lbk-dropdown>`,
})
export class FilterComponent {
  @Output() filter = new EventEmitter<FilterDto>();
  dropDownActive = false;

  onCheckedChange({ checked, label }: { checked: boolean; label: string }) {
    this.filter.emit({ checked, status: label });
  }
}
