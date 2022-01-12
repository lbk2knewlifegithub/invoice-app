import { AppModule } from "@api/app.module";
import { DatabaseService } from "@api/database";
import { InvoicesController } from "@api/invoices";
import { InvoiceEntity } from "@api/invoices/schemas";
import { credentialsStub, invoiceStub } from "@lbk/stubs";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import * as request from "supertest";

describe("Invoices Controller (e2e)", () => {
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
    await invoicesCollection().deleteMany({});
    await usersCollection().deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await invoicesCollection().deleteMany({});
    await usersCollection().deleteMany({});
  });

  function invoicesCollection() {
    return dbConnection.collection("invoices");
  }

  function usersCollection() {
    return dbConnection.collection("users");
  }

  async function insertInvoice(): Promise<InvoiceEntity> {
    const stub = invoiceStub();
    const { username, password } = credentialsStub();

    await usersCollection().updateOne(
      { username },
      {
        $set: {
          invoices: {
            "1": stub,
          },
        },
      }
    );

    const found = await usersCollection().findOne(
      {
        username,
        [`invoices.1`]: { $exists: true },
      },
      {
        projection: {
          invoices: 1,
        },
      }
    );
    const invoice = found.invoices["1"];

    return {
      ...invoice,
      createdAt: new Date(invoice.createdAt).toISOString(),
      paymentDue: new Date(invoice.paymentDue).toISOString(),
    };
  }

  async function signUp() {
    const response = await request(httpServer)
      .post("/auth/signup")
      .send(credentialsStub());
    return response.body.accessToken;
  }

  it("should defined", () => {
    expect(controller).toBeDefined();
  });

  describe("GET", () => {
    async function get(
      url: string,
      accessToken: string
    ): Promise<request.Test> {
      return request(httpServer)
        .get(url)
        .set({ Authorization: `Bearer ${accessToken}` });
    }

    describe("Get all invoices", () => {
      it("should return array of invoices", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();
        const response = await get("/invoices", accessToken);

        expect(response.body).toMatchObject([invoice]);
      });

      it("should return status code 200", async () => {
        const accessToken = await signUp();

        const response = await request(httpServer)
          .get("/invoices")
          .set({
            Authorization: `Bearer ${accessToken}`,
          });

        expect(response.status).toBe(200);
      });

      it("should return status code 401 when user not login", async () => {
        const response = await request(httpServer).get("/invoices");
        expect(response.status).toBe(401);
      });
    });

    describe("Get invoice by id", () => {
      it("should return status code 200", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();
        const response = await get(`/invoices/${invoice.id}`, accessToken);

        expect(response.status).toBe(200);
      });
      it("should return invoice by id", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();
        const response = await get(`/invoices/${invoice.id}`, accessToken);
        expect(response.body).toEqual(invoice);
      });
      it("should return status code 404 when invoice not found", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const response = await get(`/invoices/notfound`, accessToken);
        expect(response.status).toBe(404);
      });

      it("should return status code 401 when user not login", async () => {
        const response = await get(`/invoices/notfound`, "");
        expect(response.status).toBe(401);
      });
    });
  });

  describe("DELETE", () => {
    describe("delete invoice", () => {
      async function deleteRequest(url: string, accessToken: string) {
        return request(httpServer)
          .delete(url)
          .set({ Authorization: `Bearer ${accessToken}` });
      }

      it("should return status code 200 when delete invoice success", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const response = await deleteRequest(`/invoices/1`, accessToken);
        expect(response.status).toBe(200);
      });

      it("should return code 200 and delete in database", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        await deleteRequest(`/invoices/1`, accessToken);

        const found = await usersCollection().findOne({
          username: "username",
          "invoices.1": { $exists: true },
        });
        expect(found).toBeFalsy();
      });

      it("should return status code 404 when id not found", async () => {
        const accessToken = await signUp();
        await insertInvoice();

        const response = await deleteRequest(`/invoices/123`, accessToken);
        expect(response.status).toBe(404);
      });

      it("should return status code 401 when user not login", async () => {
        await request(httpServer).delete("/invoices/232").expect(401);
      });
    });
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
