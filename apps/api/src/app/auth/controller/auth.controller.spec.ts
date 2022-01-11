import { anotherCredentialStubs, credentialStubs } from "@lbk/stubs";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthController } from ".";
import { CredentialsDto } from "../dto";
import { AuthService } from "../services";

describe("Auth Controller", () => {
  let controller: AuthController;

  let mockAuthService = {
    signUp: jest.fn().mockImplementation(({ username }: CredentialsDto) => {
      if (username === credentialStubs().username)
        throw new ConflictException();

      return {
        accessToken: "abc",
      };
    }),
    login: jest
      .fn()
      .mockImplementation(({ password, username }: CredentialsDto) => {
        const stub = credentialStubs();
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
      const result = await controller.signUp(anotherCredentialStubs());
      expect(result).toEqual({
        accessToken: "abc",
      });
    });

    it("should call signUp function of AuthService", async () => {
      await controller.signUp(anotherCredentialStubs());
      expect(mockAuthService.signUp).toBeCalledWith(anotherCredentialStubs());
    });

    it("should throw error ConflictException when existed ", async () => {
      await expect(controller.signUp(credentialStubs())).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe("Login ", () => {
    it("should call login function of AuthService", async () => {
      await controller.login(credentialStubs());
      expect(mockAuthService.login).toBeCalledWith(credentialStubs());
    });

    it("should login in", async () => {
      const result = await controller.login(credentialStubs());
      expect(result).toEqual({ accessToken: "abc" });
    });

    it("should throw error UnauthorizedException", async () => {
      await expect(controller.login(anotherCredentialStubs())).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
