import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import {
  fadeInLeftOnEnterAnimation,
  fadeInOnEnterAnimation,
  fadeOutLeftOnLeaveAnimation,
  fadeOutOnLeaveAnimation
} from "angular-animations";
import { fromEvent, Subscription } from "rxjs";

@Component({
  selector: "lbk-overlay",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./overlay.component.html",
  styleUrls: ["./overlay.component.scss"],
  animations: [
    fadeInLeftOnEnterAnimation({ delay: 300 }),
    fadeOutLeftOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation({ delay: 300 }),
  ],
})
export class OverlayComponent implements OnInit, OnDestroy {
  @Input() open!: boolean;
  @Output() goBack = new EventEmitter<void>();
  clicks$ = fromEvent(document, "click");

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.clicks$.subscribe((event) => {
      const target = event.target as HTMLElement;
      const matches = target.matches(".overlay");
      if (matches) {
        this.goBack.emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
