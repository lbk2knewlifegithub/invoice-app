import {
  ChangeDetectionStrategy, Component,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lbk-unsubscribe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class Unsubscribe implements OnDestroy {
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  set appendSub(sub: Subscription) {
    this.subscriptions.push(sub);
  }
}
