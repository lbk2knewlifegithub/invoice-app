import { User } from "@lbk/models";
import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req): User => {
  return req.args[0].user;
});
