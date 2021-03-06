import { AppController } from "@api/app.controller";
import { Test, TestingModule } from "@nestjs/testing";

describe("AppController", () => {
  let app: TestingModule;
  let appController: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("getData", () => {
    it("should return Hello World!", async () => {
      expect(await appController.getData()).toEqual("Hello World!");
    });
  });
});
