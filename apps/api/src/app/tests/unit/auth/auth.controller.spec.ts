import { AuthController } from "@api/auth/auth.controller";
import { AuthService } from "@api/auth/auth.service";
import { CredentialsDto } from "@api/auth/credentials.dto";
import { anotherCredentialsStub, credentialsStub } from "@lbk/stubs";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

describe("Auth Controller", () => {
  let controller: AuthController;

  let mockAuthService = {
    signUp: jest.fn().mockImplementation(({ username }: CredentialsDto) => {
      if (username === credentialsStub().username)
        throw new ConflictException();

      return {
        accessToken: "abc",
      };
    }),
    login: jest
      .fn()
      .mockImplementation(({ password, username }: CredentialsDto) => {
        const stub = credentialsStub();
        if (stub.password === password && username === stub.username)
          return {
            accessToken: "abc",
          };

        throw new UnauthorizedException();
      }),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = app.get<AuthController>(AuthController);
  });

  it("should be defined", async () => {
    expect(controller).toBeDefined();
  });

  describe("Sign Up", () => {
    it("should return access token when user sign up success", async () => {
      const result = await controller.signUp(anotherCredentialsStub());
      expect(result).toEqual({
        accessToken: "abc",
      });
    });

    it("should call signUp function of AuthService", async () => {
      await controller.signUp(anotherCredentialsStub());
      expect(mockAuthService.signUp).toBeCalledWith(anotherCredentialsStub());
    });

    it("should throw error ConflictException when existed ", async () => {
      await expect(controller.signUp(credentialsStub())).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe("Login ", () => {
    it("should call login function of AuthService", async () => {
      await controller.login(credentialsStub());
      expect(mockAuthService.login).toBeCalledWith(credentialsStub());
    });

    it("should login in", async () => {
      const result = await controller.login(credentialsStub());
      expect(result).toEqual({ accessToken: "abc" });
    });

    it("should throw error UnauthorizedException", async () => {
      await expect(controller.login(anotherCredentialsStub())).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
