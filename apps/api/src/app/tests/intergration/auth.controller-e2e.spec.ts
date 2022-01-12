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
});
