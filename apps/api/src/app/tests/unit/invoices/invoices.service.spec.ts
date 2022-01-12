import { InvoicesService } from "@api/invoices";
import { UpdateInvoiceDto } from "@api/invoices/dto";
import { InvoicesRepo } from "@api/invoices/invoices.repo";
import { UserEntity } from "@api/users";
import { User } from "@lbk/models";
import { invoicesStub, invoiceStub } from "@lbk/stubs";
import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

describe("Invoices Services", () => {
  let service: InvoicesService;
  const userStub = new UserEntity({
    username: "banana",
    password: "bansdsana",
    salt: "bansdsana",
    invoices: new Map(),
  });

  let mockInvoicesRepo = {
    getAllInvoices: jest.fn().mockImplementation(() => invoicesStub()),
    findInvoiceById: jest.fn((_id: string, user: User) => {
      if (_id !== "abc") throw new NotFoundException();

      return {
        ...invoiceStub(),
        _id,
      };
    }),
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
      providers: [InvoicesService, InvoicesRepo],
    })
      .overrideProvider(InvoicesRepo)
      .useValue(mockInvoicesRepo)
      .compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  it("should defined", () => {
    expect(service).toBeDefined();
  });

  describe("Get All Invoices", () => {
    it("should return all invoices", async () => {
      const result = await service.getAllInvoices(userStub);
      expect(result).toEqual(invoicesStub());
    });
    it("should call getAllInvoices of InvociesRepo", async () => {
      await service.getAllInvoices(userStub);
      expect(mockInvoicesRepo.getAllInvoices).toBeCalledWith(userStub);
    });
  });

  describe("Get Invoice", () => {
    it("should return invoice by id", async () => {
      const result = await service.getInvoice(userStub, 1);
      expect(result).toEqual({ ...invoiceStub(), _id: "abc" });
    });

    it("should call getInvoice of InvoicesRepo", async () => {
      await service.getInvoice(userStub, 1);
      expect(mockInvoicesRepo.findInvoiceById).toBeCalledWith("abc");
    });

    it("should throw NotFoundException when not found the invoice", async () => {
      await expect(service.getInvoice(userStub, -1)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("Create Invoice", () => {
    function createInvoiceDto(): any {
      const createInvoiceDto = invoiceStub();
      return createInvoiceDto;
    }

    it("should return create invoice and return new invoice  ", async () => {
      const result = await service.createInvoice(userStub, createInvoiceDto());
      expect(result).toEqual({ ...invoiceStub(), _id: expect.any(String) });
    });

    it("should call createInvoice of InvoicesRepo", async () => {
      await service.createInvoice(userStub, createInvoiceDto());

      expect(mockInvoicesRepo.createInvoice).toBeCalledWith(
        userStub,
        createInvoiceDto()
      );
    });
  });

  describe("Delete Invoice", () => {
    it("should delete invoice by id", async () => {
      const result = await service.deleteInvoice(userStub, 1);
      expect(result).toEqual(undefined);
    });

    it("should call deleteInvoice of InvoicesRepo", async () => {
      await service.deleteInvoice(userStub, 1);

      expect(mockInvoicesRepo.deleteInvoice).toBeCalledWith(userStub, 1);
    });
  });

  describe("Update Invoice", () => {
    function updateInvoiceDto(): any {
      const updateInvoiceDto = invoiceStub();
      return updateInvoiceDto;
    }

    it("should update invoice by id", async () => {
      const result = await service.updateInvoice(
        "abc",
        userStub,
        updateInvoiceDto()
      );
      expect(result).toEqual({ ...invoiceStub(), _id: expect.any(String) });
    });

    it("should call updateInvoice of InvoicesRepo", async () => {
      await service.updateInvoice("abc", userStub, updateInvoiceDto());

      expect(mockInvoicesRepo.updateInvoice).toBeCalledWith(
        "abc",
        userStub,
        updateInvoiceDto()
      );
    });
  });
});
