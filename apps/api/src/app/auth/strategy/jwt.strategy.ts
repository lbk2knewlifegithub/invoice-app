import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../../users";
import { UserService } from "../../users/services";
import { JwtPayload } from "../models";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * - Override method here
   * @param payload
   */
  async validate({ username }: JwtPayload): Promise<User> {
    const user = await this._userService.findByUserName(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
