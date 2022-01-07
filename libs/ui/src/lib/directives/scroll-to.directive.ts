import {
  Directive,
  ElementRef, Input,
  OnInit
} from '@angular/core';

@Directive({ selector: '[scrollTo]' })
export class ScrollToDirective implements OnInit {
  @Input() delay = 500;

  constructor(private ref: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.ref.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, this.delay);
  }
}
