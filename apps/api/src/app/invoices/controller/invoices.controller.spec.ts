import { Invoice } from "@lbk/models";
import { invoiceStub } from "@lbk/stubs";
import { Test } from "@nestjs/testing";
import { InvoicesService } from "../services/invoices.service";
import { InvoicesController } from "./invoices.controller";

describe("Invoices Controller", () => {
  let controller: InvoicesController;

  let mockInvoiceService = {
    getInvoices: jest.fn(),
    getInvoiceById: jest.fn(),
    createInvoice: jest.fn(),
    deleteInvoiceById: jest.fn(),
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

  describe("Get All Invoices", () => {
    it.todo("should return all invoices");
  });

  describe("Get Invoice By Id", () => {
    it.todo("should return invoice by id");
    it.todo("should return throw NotFoundException when not found the invoice");
  });

  function validateInvoice(invoice: Invoice) {
    describe("paymentDue", () => {
      it.todo(
        "should throw BadRequestException when paymentDue larger than 30"
      );

      it.todo(
        "should throw BadRequestException when paymentDue smaller than 1"
      );
      it.todo(
        "should throw BadRequestException when paymentDue is not a number"
      );
    });

    describe("description", () => {
      it.todo(
        "should throw BadRequestException when description have length larger than 200"
      );

      it.todo(
        "should throw BadRequestException when paymentDue smaller than 1"
      );

      it.todo(
        "should throw BadRequestException when paymentDue is not a string"
      );
    });

    describe("createdAt", () => {
      it.todo("should throw BadRequestException when createdAt invalid");
    });
  }

  describe("Create Invoice", () => {
    it.todo("should return create invoice and return new invoice  ");

    it("should valid invoice", () => {
      // validateInvoice(invoiceStub());
    });
  });

  describe("Delete Invoice", () => {
    it.todo("should delete invoice by id");
    it.todo("should throw NotFoundException when not found the invoice");
  });
});
