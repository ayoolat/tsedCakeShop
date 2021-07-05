// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Controller,  BodyParams, Post, ProviderScope, Scope, Put, PathParams, PlatformMulterFile, MultipartFile, Req, Get, UseAuth, UseBefore} from "@tsed/common";
import { users } from "../entity/users";
import { Role, } from "../entity/roles";
import { UsersService } from "../provider/usersService";
import { Authenticate, Authorize} from "@tsed/passport";
import * as jwt from "jsonwebtoken"
import { InsertResult, UpdateResult } from "typeorm";
import { Returns } from "@tsed/schema";
import { CustomAuthMiddleware } from "../middlewares/authorization";
// import { authentication } from "../middlewares/jwtSignToken";

@Controller("/users")
@Scope(ProviderScope.SINGLETON)
export class Users {
  constructor(private readonly user:UsersService){

  }

  @Post("/login")
  @Authorize("login")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@BodyParams('email') email:string,@BodyParams('password') password:string) : Promise<users | undefined | string> {
    const newUser =await  this.user.findOne(email)
        const token = jwt.sign({
            data : newUser
        }, "secret", {
            expiresIn: '2h'
        })
        return token
  }

  @Post('/signUp')
  @(Returns(200).Of().Description("success"))
  @Authorize("signUp")
  async signUp(@BodyParams() user:users):Promise<InsertResult|Error>{
    try{
      await this.user.create(user)
      const userID = await this.user.create(user)
      if(userID){
        const role = await this.user.addNewUserRole(Role.ADMIN, userID?.identifiers[0].id)
        return role
      }

      return userID
    }
    catch(err){
      return err
    }
  }

  @Put('/update/:id')
  @Authenticate("jwt")
  async update(@PathParams('id') id:string, @Req() req: Req, @MultipartFile("files", 4) files: PlatformMulterFile[]) : Promise<UpdateResult>{
    const photos:string[] = []
    for(let i = 0; i < files.length -1; i++){
      photos.push(files[i].path)
    }
    const updated = this.user.updateUserProfile(id,photos)
    return updated
  }

  @Get('/get-profile/:id')
  @Authenticate("jwt")
  @UseAuth(CustomAuthMiddleware, {role: "RIK Logistics Business Admin"})
  // @UseBefore(authentication)
  async get(@PathParams('id') id:string):Promise<users | undefined>{
    const user = this.user.findOneById(id)
    return user
  }

  @Get("/all-users")
  @Authenticate("jwt")
  async allUsers():Promise<users[]>{
    const user = this.user.findAll()
    return user
  }
}
