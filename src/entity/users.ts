import {
    Default,
    Email,
    Format,
    Required,
    MinLength
  } from "@tsed/schema";
  import {Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn} from "typeorm";
  import {userRoles } from "./roles"
  
    @Entity()
  export class users {
    @PrimaryGeneratedColumn()
    @Generated()
    id: string;

    @Column()
    @Required()
    username: string;

    @Column()
    @Required()
    @Email()
    email: string

    @Column()
    @Required()
    @MinLength(10)
    password: string

    @Column("simple-array",{nullable: true})
    photo:string[]

    @OneToMany(()=> userRoles, userole => userole.user)
    userole: userRoles[]

    @Column()
    @Format("date-time")
    @Default(Date.now)
    dateCreation: Date = new Date()
  }