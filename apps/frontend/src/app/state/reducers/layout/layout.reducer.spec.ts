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
    it("should close edit overlay panel", () => {
      const newState: fromLayout.State = {
        darkTheme: false,
        showEditOverlay: false,
        showNewInvoiceOverlay: false,
      };
      const action = LayoutActions.closeEditOverlay();
      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
    });

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
    it("should close new invoice overlay panel", () => {
      const action = LayoutActions.closeNewInvoiceOverlay();
      const state = reducer(initialState, action);
      expect(state).toMatchObject({ showNewInvoiceOverlay: false });
    });

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
});
