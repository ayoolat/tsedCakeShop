import {Req} from "@tsed/common";
import {OnVerify, Protocol} from "@tsed/passport";
import {IStrategyOptions, Strategy} from "passport-local";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {users} from "../entity/users";
import {UsersService} from "../provider/usersService";


@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify {
  constructor(private usersService: UsersService) {
  }

  async $onVerify(@Req() request: Req) : Promise<users> {
    const {email, password} = request.body;

    const user = await this.usersService.findOne(email);
    const isPassword = await this.usersService.verifyPassword(password)

    if (!user) {
    //   return false;
      throw new Error("Wrong email")
    }

    if (!isPassword) {
    //   return false;
      throw new Error("Wrong password")
    }

    return user;
  }

}