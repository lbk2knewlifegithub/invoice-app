import { createAction } from "@ngrx/store";

/**
 * - Edit Invoice overlay
 */
export const showEditOverlay = createAction("[Layout] Show Edit Overlay");

/**
 * - New Invoice overlay
 */
export const showNewInvoiceOverlay = createAction(
  "[Layout] Show New Invoice Overlay"
);

/**
 * - Dark Theme
 */
export const loadTheme = createAction("[Layout] Load Theme");
export const toDarkTheme = createAction("[Layout] To Dark Theme");
export const toLightTheme = createAction("[Layout] To Light Theme");

export const closeAllOverlay = createAction("[Layout] Close All Overlay");
