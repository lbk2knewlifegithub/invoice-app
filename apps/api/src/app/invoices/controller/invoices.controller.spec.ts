import { Test } from "@nestjs/testing";
import { InvoicesService } from "..";
import { InvoicesController } from "./invoices.controller";

describe("Invoices Controller", () => {
  let controller: InvoicesController;

  let mockInvoiceService = {
    createInvoice: jest.fn(),
    // .mockImplementation((user: User, createInvoiceDto: CreateInvoiceDto) => {
    //   return invoiceStub();
    // }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [InvoicesService],
    })
      .overrideProvider(InvoicesService)
      .useValue(mockInvoiceService)
      .compile();

    controller = module.get<InvoicesController>(InvoicesController);
  });

  it("should defined", () => {
    expect(controller).toBeDefined();
  });

  it.todo("should return all invoices of user");
  it.todo("should retrieve invoice by id");
  it.todo("should delete invoice");
  it.todo("should update invoice");
  it.todo("should create invoice");
});
