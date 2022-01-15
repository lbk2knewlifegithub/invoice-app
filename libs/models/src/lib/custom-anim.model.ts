export interface CustomAnimation {
  duration?: number; // ms
  name?: string;
  delayIn?: number; // ms
  delayOut?: number; // ms
  timing?: "ease-in" | "ease-out" | "ease-in-out" | "linear";
  query?: string;
  staggerDuration?: number;
}

export const DefaultCustomAnimation: CustomAnimation = {
  duration: 300,
  delayIn: 0,
  delayOut: 0,
  timing: "ease-in-out",
  staggerDuration: 200,
};
