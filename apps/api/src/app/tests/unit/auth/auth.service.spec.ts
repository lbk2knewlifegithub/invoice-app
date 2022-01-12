import { AuthService } from "@api/auth/auth.service";
import { CredentialsDto } from "@api/auth/credentials.dto";
import { JwtPayload } from "@api/auth/jwt-payload.model";
import { UserService } from "@api/users/services";
import { anotherCredentialsStub, credentialsStub } from "@lbk/stubs";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

describe("Auth Service", () => {
  let authService: AuthService;

  let mockUserService = {
    signUp: jest.fn().mockImplementation(({ username }: CredentialsDto) => {
      if (username === credentialsStub().username)
        throw new ConflictException();

      return {
        accessToken: "abc",
      };
    }),
    validate: jest
      .fn()
      .mockImplementation(({ password, username }: CredentialsDto) => {
        const stub = credentialsStub();
        if (stub.password === password && username === stub.username)
          return {
            username,
          };
        return undefined;
      }),
  };

  let mockJwtService = {
    signAsync: jest.fn().mockImplementation(({ username }: JwtPayload) => {
      return "abc";
    }),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    authService = app.get<AuthService>(AuthService);
  });

  it("should be defined", async () => {
    expect(authService).toBeDefined();
  });

  describe("Sign Up", () => {
    it("should return access token when user sign up success", async () => {
      const result = await authService.signUp(anotherCredentialsStub());
      expect(result).toEqual({
        accessToken: "abc",
      });
    });

    it("should call signUp function of AuthService", async () => {
      await authService.signUp(anotherCredentialsStub());
      expect(mockUserService.signUp).toBeCalledWith(anotherCredentialsStub());
    });

    it("should throw error ConflictException when existed ", async () => {
      await expect(authService.signUp(credentialsStub())).rejects.toThrow(
        ConflictException
      );
    });
  });

  describe("Login ", () => {
    it("should call validate function of UserService", async () => {
      await authService.login(credentialsStub());
      expect(mockUserService.validate).toBeCalledWith(credentialsStub());
    });

    it("should login in", async () => {
      const result = await authService.login(credentialsStub());
      expect(result).toEqual({ accessToken: "abc" });
    });

    it("should throw error UnauthorizedException", async () => {
      await expect(authService.login(anotherCredentialsStub())).rejects.toThrow(
        UnauthorizedException
      );
    });
  });
});
