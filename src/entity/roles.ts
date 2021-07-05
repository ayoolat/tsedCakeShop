import {
    Required,
  } from "@tsed/schema";
  import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { users } from "./users";

  export enum Role {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost"
  }
  
  @Entity()
  export class userRoles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "enum",
    enum: Role})
    @Required()
    role: Role

    @Required()
    @ManyToOne(() => users, user => user.id)
    user: users;    
  }