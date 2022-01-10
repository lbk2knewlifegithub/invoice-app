import { LayoutActions } from "../../actions";
import * as fromLayout from "./layout.reducer";

describe("Layout Reducer", () => {
  let initialState: fromLayout.State = {
    darkTheme: false,
    showEditOverlay: false,
    showNewInvoiceOverlay: false,
  };
  let reducer = fromLayout.reducer;

  beforeEach(() => {
    initialState = {
      darkTheme: false,
      showEditOverlay: false,
      showNewInvoiceOverlay: false,
    };
  });

  describe("unknown action", () => {
    it("should return the default state", () => {
      const action = {
        type: "Unknown",
      };
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe("Edit Invoice Overlay", () => {
    it("should open edit overlay panel", () => {
      const action = LayoutActions.showEditOverlay();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({ showEditOverlay: true });
    });

    it("should close new invoice overlay when edit invoice overlay open", () => {
      const action = LayoutActions.showEditOverlay();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        showNewInvoiceOverlay: false,
        showEditOverlay: true,
      });
    });
  });

  describe("New Invoice Overlay", () => {
    it("should open new invoice overlay panel", () => {
      const action = LayoutActions.showNewInvoiceOverlay();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({ showNewInvoiceOverlay: true });
    });

    it("should close edit overlay when new invoice overlay open", () => {
      const action = LayoutActions.showNewInvoiceOverlay();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        showNewInvoiceOverlay: true,
        showEditOverlay: false,
      });
    });
  });

  describe("Dark Theme", () => {
    it("should enable dark them when toggleDarkThem false", () => {
      const action = LayoutActions.toDarkTheme();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({ darkTheme: true });
    });

    it("should disabled dark them when toggleDarkThem true", () => {
      const action = LayoutActions.toLightTheme();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({ darkTheme: false });
    });
  });

  describe("Close all overlay", () => {
    it("Should close all overlay", () => {
      const action = LayoutActions.closeAllOverlay();
      const state = reducer(
        { ...initialState, showEditOverlay: true, showNewInvoiceOverlay: true },
        action
      );
      expect(state).toMatchObject({
        showEditOverlay: false,
        showNewInvoiceOverlay: false,
      });
    });
  });
});
