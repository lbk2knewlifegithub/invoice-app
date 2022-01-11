import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
