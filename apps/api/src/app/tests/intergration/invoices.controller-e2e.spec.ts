import { AppModule } from "@api/app.module";
import { DatabaseService } from "@api/database";
import { InvoicesController } from "@api/invoices";
import { InvoiceEntity } from "@api/invoices/schemas";
import { InvoiceStatus, PaymentTerms } from "@lbk/models";
import { credentialsStub, invoiceStub, itemStub } from "@lbk/stubs";
import { CACHE_MANAGER, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Cache } from "cache-manager";
import { Connection } from "mongoose";
import * as request from "supertest";

describe("Invoices Controller (e2e)", () => {
  let dbConnection: Connection;
  let controller: InvoicesController;
  let httpServer: any;
  let app: INestApplication;
  let cacheManager: Cache;

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
    cacheManager = app.get<Cache>(CACHE_MANAGER);
  });

  afterAll(async () => {
    await cacheManager.del("numberOfInvoices");
    await invoicesCollection().deleteMany({});
    await usersCollection().deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await cacheManager.del("numberOfInvoices");
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
  describe("POST", () => {
    async function post(url: string, accessToken: string, body: any) {
      return request(httpServer)
        .post(url)
        .send(body)
        .set({ Authorization: `Bearer ${accessToken}` });
    }

    it("should return status code 201 when create invoice success", async () => {
      const accessToken = await signUp();
      const stub = invoiceStub();
      const response = await post("/invoices", accessToken, stub);
      expect(response.status).toBe(201);
    });

    it("should exist invoice in database ", async () => {
      const accessToken = await signUp();
      const stub = invoiceStub();
      const response = await post("/invoices", accessToken, stub);

      const found = await usersCollection().findOne({
        username: credentialsStub().username,
        [`invoices.${response.body.id}`]: { $exists: true },
      });
      expect(found.invoices[0]).toEqual({
        ...invoiceStub(),
        id: 0,
        createdAt: new Date(invoiceStub().createdAt),
        paymentDue: new Date(invoiceStub().paymentDue),
      });
    });

    it("should exist invoice using get request", async () => {
      const accessToken = await signUp();
      const stub = invoiceStub();
      await post("/invoices", accessToken, stub);

      const response = await request(httpServer)
        .get("/invoices/0")
        .set({ Authorization: "Bearer " + accessToken });

      expect(response.body).toEqual({
        ...invoiceStub(),
        id: 0,
        createdAt: new Date(invoiceStub().createdAt).toISOString(),
        paymentDue: new Date(invoiceStub().paymentDue).toISOString(),
      });
    });

    it("should return invoice id ascending", async () => {
      const accessToken = await signUp();
      const stub = invoiceStub();
      await post("/invoices", accessToken, stub);
      await post("/invoices", accessToken, stub);
      const response = await post("/invoices", accessToken, stub);

      expect(response.body).toMatchObject({ id: 2 });
    });

    it("should return 401 when user not login", async () => {
      const response = await post("/invoices", "invalid", {});
      expect(response.status).toBe(401);
    });

    describe("Validation", () => {
      describe("createdAt", () => {
        it("should return 400 when createdAt not is date format", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          stub.createdAt = "invalid";
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });
        it("should return 400 when createdAt not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          delete stub.createdAt;
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });
      });

      describe("post - description", () => {
        it("should return 400 when description have length larger than 500", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          stub.description = Array.from({ length: 500 }, (v, i) => i).join("");
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });
        it("should return 400 when description have length shorter than 5", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          stub.description = "3323";
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return 400 when description not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          delete stub.description;
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });
      });

      describe("post - paymentTerms", () => {
        it("should return 400 when paymentTerms not in 1, 7, 30 days", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          stub.paymentTerms = 300;
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return message 'Payment terms must be 1, 7, 30 days' when paymentTerms invalid", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          stub.paymentTerms = 300;
          const response = await post("/invoices", accessToken, stub);
          expect(response.body.message).toContain(
            "Payment terms must be 1, 7, 30 days"
          );
        });

        it("return return 400 when paymentTerms not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          delete stub.paymentTerms;

          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });
      });

      describe("post - status", () => {
        it("should return 400 when status not in paid, draft, pending", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          stub.status = "invalid";
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return 400 when status not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          delete stub.status;

          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return message 'InvoiceStatus must be paid, draft, pending days' when status invalid", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          stub.status = "invalid";
          const response = await post("/invoices", accessToken, stub);
          expect(response.body.message).toContain(
            "InvoiceStatus must be paid, draft, pending days"
          );
        });
      });

      describe("post - clientName", () => {
        it("should return 400 when clientName shorter than 5", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          stub.clientName = "abcd";
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return 400 when clientName not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          delete stub.clientName;
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return 400 when clientName not a string", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          stub.clientName = 134432325;
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return 400 when clientName longer than 30", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          stub.clientName = Array.from({ length: 40 }).join("sdfs");
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });
      });

      /**
       * - Test for senderAddress and clientAddress because its use same AddressDto
       */
      describe("post - address", () => {
        it("should return 400 when senderAddress not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          delete stub.senderAddress;

          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        it("should return 400 when clientAddress not provided", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub();
          delete stub.clientAddress;

          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        describe("street", () => {
          it("should return 400 when street shorter than 5", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.street = "abc";
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when street not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub();

            const senderAddress = stub.senderAddress;
            delete senderAddress.street;
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when street longer than 50", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.street = Array.from({ length: 60 }).join("adsfs");
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when street not type of string", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress as any;
            senderAddress.street = 2342342342;
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });

        describe("city", () => {
          it("should return 400 when city shorter than 5", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.city = "abc";
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when city not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            delete senderAddress.city;

            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when city longer than 50", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.city = Array.from({ length: 60 }).join("adsfs");
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when city not type of string", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress as any;
            senderAddress.city = 2342342342;
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });

        describe("postCode", () => {
          it("should return 400 when postCode shorter than 3", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.postCode = "ab";
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when postCode not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            delete senderAddress.postCode;

            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when postCode longer than 20", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.postCode = Array.from({ length: 21 }).join("adsfs");
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when postCode not type of string", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress as any;
            senderAddress.postCode = 2342342342;
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });

        describe("country", () => {
          it("should return 400 when country shorter than 3", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.country = "ab";
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when country not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub();

            const senderAddress = stub.senderAddress;
            delete senderAddress.country;
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when country longer than 20", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress;
            senderAddress.country = Array.from({ length: 21 }).join("adsfs");
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when country not type of string", async () => {
            const accessToken = await signUp();
            const stub = invoiceStub();
            const senderAddress = stub.senderAddress as any;
            senderAddress.country = 2342342342;
            const response = await post("/invoices", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });
      });

      describe("items", () => {
        it("should return 400 when items not a array", async () => {
          const accessToken = await signUp();
          const stub = invoiceStub() as any;
          stub.items = "abcd";
          const response = await post("/invoices", accessToken, stub);
          expect(response.status).toBe(400);
        });

        describe("post - item", () => {
          describe("name", () => {
            it("should return 400 when name not is string", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  name: 1232321,
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when name not provided", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              const stubItem = itemStub();
              delete stubItem.name;

              stub.items = [
                {
                  ...stubItem,
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when name shorter than 3", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  name: "ab",
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when name longer than 100", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  name: Array.from({ length: 101 }).join("sdfa"),
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });
          });

          describe("quantity", () => {
            it("should return 400 when quantity not provided", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              const stubItem = itemStub();
              delete stubItem.quantity;

              stub.items = [
                {
                  ...stubItem,
                },
              ];

              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when quantity not is number", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  quantity: "stringstring",
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when quantity smaller than 1", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  quantity: 0,
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when quantity larger than 100_000", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  quantity: 100_001,
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });
          });

          describe("price", () => {
            it("should return 400 when price not provided", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              const stubItem = itemStub();
              delete stubItem.price;

              stub.items = [
                {
                  ...stubItem,
                },
              ];

              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when price not is number", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  price: "stringstring",
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });

            it("should return 400 when price smaller than 1", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  price: 0,
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });
            it("should return 400 when price larger than 100_000_000", async () => {
              const accessToken = await signUp();
              const stub = invoiceStub() as any;
              stub.items = [
                {
                  ...itemStub(),
                  price: 100_000_001,
                },
              ];
              const response = await post("/invoices", accessToken, stub);
              expect(response.status).toBe(400);
            });
          });
        });
      });
    });
  });

  describe("PUT", () => {
    async function putRequest(url: string, accessToken: string, body: any) {
      return request(httpServer)
        .put(url)
        .send(body)
        .set({ Authorization: `Bearer ${accessToken}` });
    }

    it("should return 401 when user not login", async () => {
      await signUp();
      const response = await putRequest("/invoices/invalid", "invalid", {});
      expect(response.status).toBe(401);
    });

    it("should return 404 when not found invoice to update", async () => {
      const accessToken = await signUp();
      const stub = await insertInvoice();
      const response = await putRequest(
        "/invoices/notfound",
        accessToken,
        stub
      );
      expect(response.status).toBe(404);
    });

    describe("createdAt", () => {
      it("should return 200 when update createdAt success", async () => {
        const accessToken = await signUp();
        const stub = await insertInvoice();

        const response = await putRequest("/invoices/1", accessToken, {
          ...stub,
          createdAt: new Date(),
        });

        expect(response.status).toBe(200);
      });

      it("should return 400 when update createdAt not is the date format", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;
        stub.createdAt = "invalid";
        const response = await putRequest("/invoices/1", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 400 when update createdAt not provided", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;
        delete stub.createdAt;
        const response = await putRequest("/invoices/1", accessToken, stub);
        expect(response.status).toBe(400);
      });
    });

    describe("put - description", () => {
      it("should return 200 when update description success", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          description: "this is valid description",
        });

        expect(response.status).toBe(200);
      });

      it("should return 400 when description have length larger than 500", async () => {
        const accessToken = await signUp();
        const stub = invoiceStub();
        await insertInvoice();

        stub.description = Array.from({ length: 500 }, (v, i) => i).join("");
        const response = await putRequest("/invoices/1", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 400 when description have length shorter than 5", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        stub.description = "3323";
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 400 when description not provided", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        delete stub.description;
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });
    });

    describe("put - paymentTerms", () => {
      it("should return 200 when update paymentTerms success", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          paymentTerms: PaymentTerms.THIRTY_DAYS,
        });

        expect(response.status).toBe(200);
      });
      it("should return 400 when paymentTerms not in 1, 7, 30 days", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        stub.paymentTerms = 300;
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return message 'Payment terms must be 1, 7, 30 days' when paymentTerms invalid", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        stub.paymentTerms = 300;
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.body.message).toContain(
          "Payment terms must be 1, 7, 30 days"
        );
      });

      it("return return 400 when paymentTerms not provided", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        delete stub.paymentTerms;
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });
    });

    describe("put - clientName", () => {
      it("should return 200 when update clientName success", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          clientName: "Updated",
        });

        expect(response.status).toBe(200);
      });

      it("should return 400 when clientName not provided", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        delete stub.clientName;
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 400 when clientName shorter than 5", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub();

        stub.clientName = "abcd";
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 400 when clientName not a string", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;

        stub.clientName = 134432325;
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 400 when clientName longer than 30", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;

        stub.clientName = Array.from({ length: 40 }).join("sdfs");
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });
    });

    describe("put - clientEmail", () => {
      it("should return 200 when update clientEmail success", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          clientEmail: "banana@gmail.com",
        });

        expect(response.status).toBe(200);
      });

      it("should return 400 when clientEmail not provided", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        delete invoice.clientEmail;

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
        });

        expect(response.status).toBe(400);
      });

      it("should return 400 when clientEmail is not email", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const clientEmail = "invalid email";

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          clientEmail,
        });

        expect(response.status).toBe(400);
      });
    });

    describe("put - status", () => {
      it("should return 200 when update status success", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const newStatus = InvoiceStatus.PAID;
        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          status: newStatus,
        });

        expect(response.status).toBe(200);
      });

      it("should return 400 when status not provided", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        delete invoice.status;
        const response = await putRequest("/invoices/0", accessToken, invoice);
        expect(response.status).toBe(400);
      });

      it("should return 400 when status not in paid, draft, pending", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;

        stub.status = "invalid";
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return message 'InvoiceStatus must be paid, draft, pending days' when status invalid", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;

        stub.status = "invalid";
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.body.message).toContain(
          "InvoiceStatus must be paid, draft, pending days"
        );
      });
    });

    describe("address", () => {
      describe("put - street", () => {
        it("should return 200 when update street success", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const newStreet = "invalid street";

          const response = await putRequest("/invoices/1", accessToken, {
            ...invoice,
            senderAddress: {
              ...invoice.senderAddress,
              street: newStreet,
            },
          });

          expect(response.status).toBe(200);
        });

        it("should return 400 when street shorter than 5", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress;
          senderAddress.street = "abc";

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when street longer than 50", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress;
          senderAddress.street = Array.from({ length: 60 }).join("adsfs");

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when street not provided", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();

          const senderAddress = invoice.senderAddress as any;
          senderAddress.street = 2342342342;
          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );
          expect(response.status).toBe(400);
        });

        it("should return 400 when street not type of string", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress as any;
          senderAddress.street = 2342342342;

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });
      });

      describe("put - city", () => {
        it("should return 200 when update city success", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();

          const newCity = "invalid city";
          const response = await putRequest("/invoices/1", accessToken, {
            ...invoice,
            senderAddres: {
              ...invoice.senderAddress,
              city: newCity,
            },
          });

          expect(response.status).toBe(200);
        });

        it("should return 400 when city not provided", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();

          const senderAddress = invoice.senderAddress;
          delete senderAddress.city;
          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );
          expect(response.status).toBe(400);
        });

        it("should return 400 when city shorter than 5", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();

          const senderAddress = invoice.senderAddress;
          senderAddress.city = "abc";
          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );
          expect(response.status).toBe(400);
        });

        it("should return 400 when city longer than 50", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress;
          senderAddress.city = Array.from({ length: 60 }).join("adsfs");

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when city not type of string", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress as any;
          senderAddress.city = 2342342342;

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });
      });

      describe("put - postCode", () => {
        it("should return 200 when update postCode success", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const newPostcode = "2adsd";

          const response = await putRequest("/invoices/1", accessToken, {
            ...invoice,
            senderAddres: {
              ...invoice.senderAddress,
              postCode: newPostcode,
            },
          });

          expect(response.status).toBe(200);
        });

        it("should return 400 when postCode shorter than 3", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();

          const senderAddress = invoice.senderAddress;
          senderAddress.postCode = "ab";

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when postCode not provided", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();

          const senderAddress = invoice.senderAddress;
          delete senderAddress.postCode;

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when postCode longer than 20", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress;
          senderAddress.postCode = Array.from({ length: 21 }).join("adsfs");

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when postCode not type of string", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress as any;
          senderAddress.postCode = 2342342342;

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });
      });

      describe("put - country", () => {
        it("should return 200 when update country success", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const newCountry = "banana";

          const response = await putRequest("/invoices/1", accessToken, {
            ...invoice,
            senderAddress: {
              ...invoice.senderAddress,
              country: newCountry,
            },
          });

          expect(response.status).toBe(200);
        });

        it("should return 400 when country not provided", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          delete invoice.senderAddress.country;

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when country shorter than 3", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress;
          senderAddress.country = "ab";

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when country longer than 20", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress;
          senderAddress.country = Array.from({ length: 21 }).join("adsfs");

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });

        it("should return 400 when country not type of string", async () => {
          const accessToken = await signUp();
          const invoice = await insertInvoice();
          const senderAddress = invoice.senderAddress as any;
          senderAddress.country = 2342342342;

          const response = await putRequest(
            "/invoices/0",
            accessToken,
            invoice
          );

          expect(response.status).toBe(400);
        });
      });
    });

    describe("items", () => {
      it("should return 400 when items not a array", async () => {
        const accessToken = await signUp();
        await insertInvoice();
        const stub = invoiceStub() as any;

        stub.items = "abcd";
        const response = await putRequest("/invoices/0", accessToken, stub);
        expect(response.status).toBe(400);
      });

      it("should return 200 code when clear success", async () => {
        const accessToken = await signUp();
        const invoice = await insertInvoice();

        const response = await putRequest("/invoices/1", accessToken, {
          ...invoice,
          items: [],
        });

        expect(response.status).toBe(200);
      });

      describe("item", () => {
        describe("put - name", () => {
          it("should return 200 code when update name success", async () => {
            const accessToken = await signUp();
            const invoice = await insertInvoice();

            const stub = invoice as any;
            stub.items = [
              {
                ...itemStub(),
                name: "valid name",
              },
            ];
            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(200);
          });

          it("should return 400 when name not is string", async () => {
            const accessToken = await signUp();
            await insertInvoice();

            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                name: 1232321,
              },
            ];
            const response = await putRequest("/invoices/0", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when name not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            const stubItem = itemStub();
            delete stubItem.name;

            stub.items = [stubItem];

            const response = await putRequest("/invoices/0", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when name shorter than 3", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                name: "ab",
              },
            ];

            const response = await putRequest("/invoices/0", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when name longer than 100", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                name: Array.from({ length: 101 }).join("sdfa"),
              },
            ];

            const response = await putRequest("/invoices/0", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });

        describe("put - quantity", () => {
          it("should return 200 code when update quantity success", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                quantity: 100,
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);

            expect(response.status).toBe(200);
          });
          it("should return 400 when quantity not is number", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;

            stub.items = [
              {
                ...itemStub(),
                quantity: "stringstring",
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when quantity smaller than 1", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;

            stub.items = [
              {
                ...itemStub(),
                quantity: 0,
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when quantity not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            const stubItem = itemStub();
            delete stubItem.quantity;
            stub.items = [stubItem];

            const response = await putRequest("/invoices/1", accessToken, stub);

            expect(response.status).toBe(400);
          });

          it("should return 400 when quantity larger than 100_000", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                quantity: 100_001,
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });

        describe("put - price", () => {
          it("should return 200 code when update price success", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                price: 100,
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);

            expect(response.status).toBe(200);
          });

          it("should return 400 when price not provided", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            const stubItem = itemStub();
            delete stubItem.price;
            stub.items = [stubItem];

            const response = await putRequest("/invoices/1", accessToken, stub);

            expect(response.status).toBe(400);
          });

          it("should return 400 when price not is number", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                price: "stringstring",
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(400);
          });

          it("should return 400 when price smaller than 1", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                price: 0,
              },
            ];
            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(400);
          });
          it("should return 400 when price larger than 100_000_000", async () => {
            const accessToken = await signUp();
            await insertInvoice();
            const stub = invoiceStub() as any;
            stub.items = [
              {
                ...itemStub(),
                price: 100_000_001,
              },
            ];

            const response = await putRequest("/invoices/1", accessToken, stub);
            expect(response.status).toBe(400);
          });
        });
      });
    });
  });
});
