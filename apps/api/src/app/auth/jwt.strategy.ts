import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./repo";
import { JwtPayload, User } from "./schemas";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userRepository: UserRepository,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: configService.get('jwt.secret'),
      secretOrKey: "abc",
    });
  }

  /**
   * - Override method here
   * @param payload
   */
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = this._userRepository.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
