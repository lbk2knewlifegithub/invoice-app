import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'lbk-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() active = false;
  @Output() activeChange = new EventEmitter<boolean>();
  click$ = fromEvent(document, 'click');
  subscription!: Subscription;

  constructor(private readonly _cd: ChangeDetectorRef, private zone: NgZone) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(): void {
    this.activeChange.emit(!this.active);
  }

  ngOnInit(): void {
    this.subscription = this.click$.subscribe((event) => {
      this.zone.runOutsideAngular(() => {
        const target = event.target as HTMLElement;
        const closest = target.closest('lbk-dropdown');

        if (!closest) {
          this.zone.run(() => {
            this.activeChange.emit(false);
            this._cd.markForCheck();
          });
        }
      });
    });
  }
}
