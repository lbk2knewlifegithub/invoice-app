import { AppModule } from "@api/app.module";
import { DatabaseService } from "@api/database";
import { InvoicesController } from "@api/invoices";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import * as request from "supertest";

describe("Invoices Control", () => {
  let dbConnection: Connection;
  let controller: InvoicesController;
  let httpServer: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    controller = app.get<InvoicesController>(InvoicesController);

    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection("invoices").deleteMany({});
  });

  it("should defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Authentication", () => {
    it("should return status code 401", async () => {
      const response = await request(httpServer).get("/invoices");
      expect(response.status).toBe(401);
    });
  });

  // describe("Get Invoices", () => {
  //   it("should return array of invoices", async () => {
  //     const invoice = invoiceStub();
  //     invoice._id = undefined;
  //     await dbConnection.collection("invoices").insertOne({ invoice });

  //     const response = await request(httpServer).get("/invoices");

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(invoiceStub());
  //   });
  // });

  // describe("Create Invoice", () => {
  //   it("should create a invoice", async () => {
  //     const invoice = invoiceStub();
  //     invoice._id = undefined;

  //     const createUserDto = { ...invoice };

  //     const response = await request(httpServer).post("/invoices").send({
  //       createUserDto,
  //     });

  //     expect(response.status).toBe(201);
  //     // expect(response.body).toEqual(invoiceStub());

  //     const banana = await dbConnection
  //       .collection("invoices")
  //       .findOne({ email: "lemon@gmail.com" });

  //       expect(banana).toBeDefined();
  //   });
  // });
});
