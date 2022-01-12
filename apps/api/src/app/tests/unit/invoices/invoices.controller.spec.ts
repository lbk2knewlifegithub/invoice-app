import { InvoicesController, InvoicesService } from "@api/invoices";
import { UpdateInvoiceDto } from "@api/invoices/dto";
import { UserEntity } from "@api/users";
import { User } from "@lbk/models";
import { invoicesStub, invoiceStub } from "@lbk/stubs";
import { Test } from "@nestjs/testing";

describe("Invoices Controller", () => {
  let controller: InvoicesController;
  const userStub = new UserEntity({
    username: "banana",
    password: "bansdsana",
    salt: "bansdsana",
    invoices: new Map(),
  });

  let mockInvoiceService = {
    getAllInvoices: jest.fn().mockImplementation(() => invoicesStub()),
    getInvoice: jest.fn((_id: string, user: User) => ({
      ...invoiceStub(),
      _id,
    })),
    createInvoice: jest.fn(() => ({ _id: "banana", ...invoiceStub() })),
    deleteInvoice: jest.fn(() => {}),
    updateInvoice: jest.fn(
      (_id: string, user: User, updateInvoiceDto: UpdateInvoiceDto) => ({
        _id,
        ...updateInvoiceDto,
      })
    ),
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
    it("should return all invoices", async () => {
      const result = await controller.getAllInvoices(userStub);
      expect(result).toEqual(invoicesStub());
    });
    it("should call getAllInvoices of InvoicesService", async () => {
      await controller.getAllInvoices(userStub);
      expect(mockInvoiceService.getAllInvoices).toBeCalledWith(userStub);
    });
  });

  describe("Get Invoice", () => {
    it("should return invoice by id", async () => {
      const result = await controller.getInvoice(userStub, 1);
      expect(result).toEqual({ ...invoiceStub(), _id: "abc" });
    });

    it("should call getInvoice of InvoicesService", async () => {
      await controller.getInvoice(userStub, 1);
      expect(mockInvoiceService.getInvoice).toBeCalledWith("abc");
    });
  });

  describe("Create Invoice", () => {
    function createInvoiceDto(): any {
      const createInvoiceDto = invoiceStub();
      return createInvoiceDto;
    }

    it("should return create invoice and return new invoice  ", async () => {
      const result = await controller.createInvoice(
        userStub,
        createInvoiceDto()
      );
      expect(result).toEqual({ ...invoiceStub(), _id: expect.any(String) });
    });

    it("should call createInvoice of InvoicesService", async () => {
      await controller.createInvoice(userStub, createInvoiceDto());

      expect(mockInvoiceService.createInvoice).toBeCalledWith(
        userStub,
        createInvoiceDto()
      );
    });
  });

  describe("Delete Invoice", () => {
    it("should delete invoice by id", async () => {
      const result = await controller.deleteInvoice(userStub, 1);
      expect(result).toEqual(undefined);
    });

    it("should call deleteInvoice of InvoicesService", async () => {
      await controller.deleteInvoice(userStub, 1);

      expect(mockInvoiceService.deleteInvoice).toBeCalledWith(userStub, 1);
    });
  });

  describe("Update Invoice", () => {
    function updateInvoiceDto(): any {
      const updateInvoiceDto = invoiceStub();
      return updateInvoiceDto;
    }

    it("should update invoice by id", async () => {
      const result = await controller.updateInvoice(
        "abc",
        userStub,
        updateInvoiceDto()
      );
      expect(result).toEqual({ ...invoiceStub(), _id: expect.any(String) });
    });

    it("should call updateInvoice of InvoicesService", async () => {
      await controller.updateInvoice("abc", userStub, updateInvoiceDto());

      expect(mockInvoiceService.updateInvoice).toBeCalledWith(
        "abc",
        userStub,
        updateInvoiceDto()
      );
    });
  });
});
