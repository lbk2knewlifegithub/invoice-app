import { AppModule } from "@api/app.module";
import { DatabaseService } from "@api/database";
import { InvoicesController } from "@api/invoices";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import * as request from "supertest";

describe("Invoices Controller (e2e)", () => {
  let dbConnection: Connection;
  let controller: InvoicesController;
  let httpServer: any;
  let app: INestApplication;
  let accessToken: string;

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
    accessToken = await login();
  });

  beforeEach(async () => {
    await dbConnection.collection("invoices").deleteMany({});
    await dbConnection.collection("users").deleteMany({});
  });

  async function login() {
    const response = await request(httpServer)
      .post("/auth/signup")
      .send({ username: "username", password: "password" });
    return response.body.accessToken;
  }

  it("should defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Get all invoices", () => {
    it.todo("should return array of invoices");

    it("should return status code 200", async () => {
      const response = await request(httpServer)
        .get("/invoices")
        .set({
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        });

      expect(response.status).toBe(200);
    });

    it("should return status code 401 when user not login", async () => {
      const response = await request(httpServer).get("/invoices");
      expect(response.status).toBe(401);
    });
  });

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

  describe("Get invoice by id", () => {
    it.todo("should return status code 200");
    it.todo("should retrieve invoice by id");
    it.todo("should return status code 404");
    it.todo("should return status code 401 when user not login");
  });

  describe("delete invoice", () => {
    it.todo("should return status code 200 when delete invoice success");
    it.todo("should return status code 404 when id not found");
    it.todo("should return status code 401 when user not login");
  });

  describe("Create invoice", () => {
    it.todo("should return status code 201 when create invoice success");

    it.todo("should return status code 401 when status invalid");
    it.todo("should return status code 401 when status createdAt invalid");
    it.todo("should return status code 401 when status description invalid");
    it.todo("should return status code 401 when status clientName invalid");
    it.todo("should return status code 401 when status clientName invalid");
  });
  it.todo("should update invoice");
  it.todo("should create invoice");
});
