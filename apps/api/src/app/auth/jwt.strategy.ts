import { UserEntity } from "@api/users";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../users/services";
import { JwtPayload } from "./jwt-payload.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UserService,
    private readonly _config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "banana",
    });
  }

  /**
   * - Override method here
   * @param payload
   */
  async validate({ username }: JwtPayload): Promise<UserEntity> {
    const user = await this._userService.findByUserName(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
