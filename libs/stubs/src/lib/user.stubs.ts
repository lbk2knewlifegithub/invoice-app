import { CredentialsDto } from "@api/auth/credentials.dto";
export const credentialStubs = (): CredentialsDto => ({
  username: "banana",
  password: "what the fuck",
});

export const anotherCredentialStubs = (): CredentialsDto => ({
  username: "another",
  password: "what the fuck",
});
