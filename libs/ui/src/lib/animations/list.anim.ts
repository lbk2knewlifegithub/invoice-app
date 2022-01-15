import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";
import { CustomAnimation, DefaultCustomAnimation } from "@lbk/models";

export function listIn(option?: CustomAnimation) {
  option = { ...DefaultCustomAnimation, ...option };
  const { name, delayIn, delayOut, duration, timing, staggerDuration } = option;
  return trigger(name ?? "listIn", [
    transition(
      ":enter",
      [
        query(
          "lbk-invoice-preview",
          [
            style({ opacity: 0, transform: "translateX(-100px) scale(.9)" }),
            stagger(staggerDuration ?? 100, [
              animate("{{duration}}ms {{delayIn}}ms {{timing}}"),
            ]),
          ],
          { optional: true }
        ),
      ],
      {
        params: { delayIn, timing, duration },
      }
    ),
  ]);
}
