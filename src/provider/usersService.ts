import {AfterRoutesInit, Service} from "@tsed/common"
import {TypeORMService} from "@tsed/typeorm";
import {Connection, InsertResult, UpdateResult} from "typeorm";
import { users } from "../entity/users";
import { Role, userRoles } from "../entity/roles";

@Service()
export class UsersService implements AfterRoutesInit{    
    private connection: Connection;
    constructor(private typeORMService: TypeORMService) {
    }
    
    $afterRoutesInit() {
        this.connection = this.typeORMService.get("default")!; // get connection by name
    } 

    async create(user:users):Promise<InsertResult>{
        return await this.connection.manager
        .createQueryBuilder()
        .insert()
        .into(users)
        .values(user)
        .returning("id")
        .execute();
    }

    async findOne(email:any):Promise<users| undefined>{
        const user =  await this.connection.manager.createQueryBuilder(users, "users").leftJoinAndSelect("users.userole", "userRoles") 
        .where("users.email = :email", { email: email }) 
        .getOne();
        return user
    }

    async verifyPassword(password:string):Promise<users | undefined>{
        const isPassword = await this.connection.manager.findOne(users,{password: password}) 
        return isPassword
    }

    async addNewUserRole(role:Role, id:users):Promise<InsertResult>{
        return await this.connection.manager
        .createQueryBuilder()
        .insert()
        .into(userRoles)
        .values({role: role, user: id})
        .returning("id")
        .execute();
    }

    async updateUserProfile(id:string, photo:string[]):Promise<UpdateResult>{
        return await this.connection.manager.createQueryBuilder()
        .update<users>(users, {photo: photo})
        .where("users.id = :id", { id: id })
        .returning(['id', 'name'])
        .updateEntity(true)
        .execute()
    }

    async findOneById(id : string):Promise<users | undefined>{
        return await this.connection.manager.findOne(users,{id: id})
    }

    async findAll():Promise<users[]>{
        return await this.connection.manager.find(users)   
    }
}