import { createParamDecorator } from "@nestjs/common";
import { UserEntity } from ".";

export const GetUser = createParamDecorator((data, req): UserEntity => {
  return req.args[0].user;
});
