import { itemStub } from "@lbk/stubs";
import { TotalPriceItemPipe } from "./total-price-item.pipe";

describe("Total price item", () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new TotalPriceItemPipe();

  it("should return 2320", () => {
    const stub = itemStub();
    expect(pipe.transform(stub)).toBe(2320);
  });
});
