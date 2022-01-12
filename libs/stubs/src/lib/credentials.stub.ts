import { CredentialsDto } from "@api/auth/credentials.dto";

export const credentialsStub = (): CredentialsDto => ({
  username: "banana",
  password: "what the fuck",
});

export const anotherCredentialsStub = (): CredentialsDto => ({
  username: "another",
  password: "what the fuck",
});
