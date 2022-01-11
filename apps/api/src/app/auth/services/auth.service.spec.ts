// import { credentialStubs } from "@lbk/stubs";
// import { Test } from "@nestjs/testing";
// import { AuthService } from ".";
// import { CredentialsDto } from "../dto";
// import { AuthService } from "../services";

// describe("Auth Service", () => {
//   let controller: AuthService;

//   let mockAuthService = {
//     signUp: jest
//       .fn()
//       .mockImplementation((authCredentialDto: CredentialsDto) => ({
//         accessToken: "abc",
//       })),
//     login: jest
//       .fn()
//       .mockImplementation((authCredentialDto: CredentialsDto) => ({
//         accessToken: "abc",
//       })),
//   };

//   beforeAll(async () => {
//     const app = await Test.createTestingModule({
//       controllers: [AuthService],
//       providers: [AuthService],
//     })
//       .overrideProvider(AuthService)
//       .useValue(mockAuthService)
//       .compile();

//     controller = app.get<AuthService>(AuthService);
//   });

//   it("should be defined", async () => {
//     expect(controller).toBeDefined();
//   });

//   describe("Sign Up", () => {
//     it("should return access token when user sign up success", async () => {
//       const result = await controller.signUp(credentialStubs());
//       expect(result).toEqual({
//         accessToken: "abc",
//       });
//     });

//     it("should call signUp function of AuthService", async () => {
//       await controller.signUp(credentialStubs());
//       expect(mockAuthService.signUp).toBeCalledWith(credentialStubs());
//     });
//   });

//   describe("Login ", () => {
//     it("should call login function of AuthService", async () => {
//       await controller.login(credentialStubs());
//       expect(mockAuthService.login).toBeCalledWith(credentialStubs());
//     });

//     it("should login in", async () => {
//       const result = await controller.login(credentialStubs());
//       expect(result).toEqual({ accessToken: "abc" });
//     });
//   });
// });
