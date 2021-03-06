import { AppModule } from "@api/app.module";
import { AuthController } from "@api/auth";
import { CredentialsDto } from "@api/auth/credentials.dto";
import { DatabaseService } from "@api/database";
import { credentialsStub } from "@lbk/stubs";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { Connection } from "mongoose";
import * as request from "supertest";

describe("Auth Controller (e2e)", () => {
  let dbConnection: Connection;
  let controller: AuthController;
  let httpServer: any;
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    controller = moduleFixture.get<AuthController>(AuthController);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await usersCollection().deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await usersCollection().deleteMany({});
  });

  function usersCollection() {
    return dbConnection.collection("users");
  }

  async function signup(
    credentialsDto: CredentialsDto = undefined
  ): Promise<string> {
    const response = await request(httpServer)
      .post("/auth/signup")
      .send(credentialsDto ?? credentialsStub());
    return response.body.accessToken;
  }

  it("should defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Sign Up", () => {
    it("Should  return status code 201 when sign up success", async () => {
      await request(httpServer)
        .post("/auth/signup")
        .send(credentialsStub())
        .expect(201);
    });

    it("should create user in database", async () => {
      await request(httpServer).post("/auth/signup").send(credentialsStub());

      const found = await usersCollection().findOne({
        username: credentialsStub().username,
      });
      expect(found).toBeDefined();
    });

    it("should return code 409 when username existed", async () => {
      await request(httpServer).post("/auth/signup").send(credentialsStub());

      await request(httpServer)
        .post("/auth/signup")
        .send(credentialsStub())
        .expect(409);
    });
    it("should return accessToken", async () => {
      const response = await request(httpServer)
        .post("/auth/signup")
        .send(credentialsStub());

      const accessToken = response.body.accessToken;
      expect(await jwtService.verifyAsync(accessToken)).toBeTruthy();
    });

    describe("invoices", () => {
      it("should return empty object for invoices", async () => {
        await request(httpServer).post("/auth/signup").send(credentialsStub());

        const user = await usersCollection().findOne({
          username: credentialsStub().username,
        });

        expect(user.invoices).toEqual({});
      });
    });

    describe("username", () => {
      it("should return 400 code when when a username has a length larger than 30", async () => {
        await request(httpServer)
          .post("/auth/signup")
          .send({
            username:
              "adsfasssdfasdfasfasdasassssssssssssssssssssssssssssssssssss",
            password: "password",
          })
          .expect(400);
      });

      it("should return 400 code when when a username has length smaller than 5", async () => {
        await request(httpServer)
          .post("/auth/signup")
          .send({
            username: "abcd",
            password: "password",
          })
          .expect(400);
      });

      it("should return 400 code when when a username is number", async () => {
        await request(httpServer)
          .post("/auth/signup")
          .send({
            username: 23_242_323,
            password: "password",
          })
          .expect(400);
      });
    });

    describe("password", () => {
      it("should return 400 code when when a password has a length larger than 30", async () => {
        await request(httpServer)
          .post("/auth/signup")
          .send({
            username: "valid",
            password:
              "adsfasssdfasdfasfasdasassssssssssssssssssssssssssssssssssss",
          })
          .expect(400);
      });
      it("should return 400 code when when a password has length smaller than 8", async () => {
        await request(httpServer)
          .post("/auth/signup")
          .send({
            username: "valid",
            password: "abcdefg",
          })
          .expect(400);
      });
    });
  });

  describe("Login", () => {
    it("Should return status code 201 when sign up success", async () => {
      await signup();

      await request(httpServer)
        .post("/auth/login")
        .send(credentialsStub())
        .expect(201);
    });
    it("should return 401 when login failure", async () => {
      await request(httpServer)
        .post("/auth/login")
        .send({ username: "invalid", password: "indssvalid" })
        .expect(401);
    });

    it("should return accessToken when login success", async () => {
      await signup();

      const response = await request(httpServer)
        .post("/auth/login")
        .send(credentialsStub());

      const accessToken = response.body.accessToken;

      expect(await jwtService.verifyAsync(accessToken)).toBeTruthy();
    });
  });

  describe("me", () => {
    async function me(accessToken: string): Promise<request.Test> {
      return request(httpServer).post("/auth/me").send({ accessToken });
    }
    it("Should return 200 when accessToken valid", async () => {
      const accessToken = await signup();
      const response = await me(accessToken);
      expect(response.status).toBe(200);
    });
    it("Should return 401 when accessToken invalid", async () => {
      const invalid =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      const response = await me(invalid);
      expect(response.status).toBe(401);
    });
  });
});
