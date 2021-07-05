import {IMiddleware, Middleware, Req, Context} from "@tsed/common";
import {Forbidden, Unauthorized} from "@tsed/exceptions";


@Middleware()
export class CustomAuthMiddleware implements IMiddleware {
  public use(@Req() request: Req, @Context() ctx: Context) {
   
    // retrieve options given to the @UseAuth decorator
    const options = ctx.endpoint.get(CustomAuthMiddleware) || {};
    console.log('role.......')
    console.log(request.user?.role)

    if (!request.isAuthenticated()) { // passport.js method to check auth
      throw new Unauthorized("Unauthorized");
    }

    if (request.user.role !== options.role) {
      throw new Forbidden("Forbidden");
    }
  }
}