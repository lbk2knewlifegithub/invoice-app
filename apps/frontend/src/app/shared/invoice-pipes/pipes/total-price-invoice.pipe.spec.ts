import { invoiceStub } from "@lbk/stubs";
import { TotalPriceItemPipe } from ".";
import { TotalPriceInvoicePipe } from "./total-price-invoice.pipe";

describe("Total price invoice", () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new TotalPriceInvoicePipe(new TotalPriceItemPipe());

  it("should return 556", () => {
    const stub = invoiceStub();
    expect(pipe.transform(stub)).toBeCloseTo(556);
  });

  // describe("Total price of invoice", () => {
  //   it("should return 500", () => {
  //     const stub = invoiceStub();
  //     expect(pipe.transform(stub)).toBe(500);
  //   });
  // });
});
