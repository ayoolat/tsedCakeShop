import {BodyParams, Req} from "@tsed/common";
import { OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
import {users} from "../entity/users";
import {UsersService} from "../provider/usersService";


@Protocol<IStrategyOptions>({
  name: "signUp",
  useStrategy: Strategy,
  settings: {}
})
export class LoginLocalProtocol implements OnVerify {
  constructor(private usersService: UsersService) {
  }

  async $onVerify(@Req() request: Req, @BodyParams() user: users) {

    const newUser = await this.usersService.create(user);

    
    return newUser;
  }
}