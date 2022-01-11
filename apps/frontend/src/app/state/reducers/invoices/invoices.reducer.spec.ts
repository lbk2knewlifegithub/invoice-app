import * as fromData from "@frontend/shared/data";
import {
  InvoiceActions,
  InvoicesAPIActions,
  ViewInvoicePageActions
} from "@frontend/state/actions";
import { UpdateInvoiceDto } from "@frontend/dto";
import * as fromInvoices from "./invoices.reducer";

describe("Invoices Reducer", () => {
  const invoice1 = fromData.invoices[0];
  const invoice2 = fromData.invoices[1];

  let initialState: fromInvoices.State = {
    selectedInvoiceId: null,
    ids: [],
    entities: {},
  };

  let reducer = fromInvoices.reducer;

  function createInvoicesState(): fromInvoices.State {
    return {
      selectedInvoiceId: null,
      ids: [invoice1.id, invoice2.id],
      entities: {
        [invoice1.id]: invoice1,
        [invoice2.id]: invoice2,
      },
    };
  }

  describe("unknown action", () => {
    it("should return the default state", () => {
      const action = {
        type: "Unknown",
      };
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe("load invoices success", () => {
    it("should add all invoices to state when load invoices success", () => {
      const action = InvoicesAPIActions.loadInvoicesSuccess({
        invoices: [invoice1, invoice2],
      });
      const newState: fromInvoices.State = {
        selectedInvoiceId: null,
        ids: [invoice1.id, invoice2.id],
        entities: {
          [invoice1.id]: invoice1,
          [invoice2.id]: invoice2,
        },
      };

      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe("loadInvoice action", () => {
    it("should add invoice to state", () => {
      const action = InvoiceActions.loadInvoice({ invoice: invoice1 });

      const newState: fromInvoices.State = {
        selectedInvoiceId: null,
        ids: [invoice1.id],
        entities: {
          [invoice1.id]: invoice1,
        },
      };

      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe("create invoice success", () => {
    it("should add invoice to state", () => {
      const action = InvoicesAPIActions.createInvoiceSuccess({
        invoice: invoice1,
      });

      const newState: fromInvoices.State = {
        selectedInvoiceId: null,
        ids: [invoice1.id],
        entities: {
          [invoice1.id]: invoice1,
        },
      };

      const state = reducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
  it("delete invoice success", () => {
    const action = InvoicesAPIActions.deleteInvoiceSuccess({
      id: invoice1.id,
    });

    const newState: fromInvoices.State = {
      selectedInvoiceId: null,
      ids: [invoice2.id],
      entities: {
        [invoice2.id]: invoice2,
      },
    };

    const state = reducer(createInvoicesState(), action);

    expect(state).toEqual(newState);
  });
  it("maskAsPaidSuccess", () => {
    const action = InvoicesAPIActions.maskAsPaidSuccess({
      id: invoice1.id,
    });

    const newState: fromInvoices.State = {
      selectedInvoiceId: null,
      ids: [invoice1.id, invoice2.id],
      entities: {
        [invoice1.id]: {
          ...invoice1,
          status: "paid",
        },
        [invoice2.id]: invoice2,
      },
    };

    const state = reducer(createInvoicesState(), action);

    expect(state).toEqual(newState);
  });

  it("update invoice success", () => {
    const updateInvoiceDto: UpdateInvoiceDto = {
      ...invoice1,
      status: "draft",
      clientEmail: "asdfasd@gmail.com",
    };
    const action = InvoicesAPIActions.updateInvoiceSuccess({
      id: invoice1.id,
      updateInvoiceDto,
    });

    const newState: fromInvoices.State = {
      selectedInvoiceId: null,
      ids: [invoice1.id, invoice2.id],
      entities: {
        [invoice1.id]: {
          ...invoice1,
          ...updateInvoiceDto,
        },
        [invoice2.id]: invoice2,
      },
    };

    const state = reducer(createInvoicesState(), action);

    expect(state).toEqual(newState);
  });

  describe("selectInvoice", () => {
    it("should set the selected invoice id on the state", () => {
      const action = ViewInvoicePageActions.selectInvoice({ id: invoice1.id });
      const newState: fromInvoices.State = {
        ...createInvoicesState(),
        selectedInvoiceId: invoice1.id,
      };

      const state = reducer(createInvoicesState(), action);

      expect(state).toEqual(newState);
    });
  });
});
