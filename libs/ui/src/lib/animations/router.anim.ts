import {
  animate,
  animateChild,
  group,
  keyframes,
  query,
  style,
  transition,
  trigger
} from "@angular/animations";
import * as kf from "./keyframes";

const optional = { optional: true };

export const ROUTE_CUBE_ANIMATION = trigger("routeAnimations", [
  transition("* <=> *", [
    style({
      position: "relative",
      perspective: "1000px",
    }),
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          width: "100%",
        }),
      ],
      optional
    ),
    query(
      ":enter",
      [
        style({
          opacity: 0,
        }),
      ],
      optional
    ),
    group([
      query(":leave", [animate("1s ease-in", keyframes(kf.cubeOut))], optional),
      query(":enter", [animate("1s ease-out", keyframes(kf.cubeIn))], optional),
    ]),
  ]),
]);

export const CAROUSEL_ROUTE_ANIMATION = trigger("routeAnimations", [
  transition("* <=> *", [
    style({ position: "relative" }),
    query(":enter, :leave", [
      style({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }),
    ]),
    query(":enter", [style({ left: "-100%" })]),
    query(":leave", animateChild()),
    group([
      query(":leave", [animate("300ms ease-out", style({ left: "100%" }))]),
      query(":enter", [animate("300ms ease-out", style({ left: "0%" }))]),
    ]),
    query(":enter", animateChild()),
  ]),
]);
