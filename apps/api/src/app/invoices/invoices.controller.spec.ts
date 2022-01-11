import { Test, TestingModule } from "@nestjs/testing";
import { InvoicesController } from "./invoices.controller";

describe("Invoices Controller", () => {
  let app: TestingModule;
  let controller: InvoicesController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [InvoicesController],
    }).compile();

    controller = app.get<InvoicesController>(InvoicesController);
  });

  it("should defined", () => {
    expect(controller).toBeDefined();
  });
  it.todo("should return all invoices of user");
  it.todo("should retrive invoice by id");
  it.todo("should delete invoice");
  it.todo("should update invoice");
  it.todo("should create invoice");
});
