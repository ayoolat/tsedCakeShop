// import {Req} from "@tsed/common";
import {  Req } from "@tsed/common";
import {Arg, OnVerify, Protocol} from "@tsed/passport";
import { passportJwtSecret } from "jwks-rsa";
import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import config from "../config/env";
import { users } from "../entity/users";
import {UsersService} from "../provider/usersService";

@Protocol<StrategyOptions>({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    secretOrKeyProvider:passportJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      requestHeaders: {},
      jwksUri: config.jwksUri
    }),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer : config.openID_Issuer
  }
})
export class JwtProtocol implements OnVerify {
  constructor(private userService: UsersService) {
    
  }

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any):Promise<boolean | users> {
    // await this.userService.findOne(jwtPayload.data.email);
    return jwtPayload ? jwtPayload : false;
  }

}
