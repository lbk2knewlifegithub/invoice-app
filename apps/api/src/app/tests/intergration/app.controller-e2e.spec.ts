import { AppModule } from "@api/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/ (GET)", () => {
    function get() {
      return request(app.getHttpServer()).get("/");
    }

    it("should return status code 200", async () => {
      const result = await get();
      expect(result.status).toBe(200);
    });

    it("should return text Hello World!", async () => {
      const result = await get();
      expect(result.text).toBe("Hello World!");
    });
  });
});
