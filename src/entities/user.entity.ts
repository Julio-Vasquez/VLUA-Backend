import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";
import { State } from "./enums/state.enum";

@Entity('User')
export class User
{
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id"
  })
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : number;

  @Column({
    nullable: false,
    type: "varchar",
    name: "userName",
    length: 45
  })
  userName : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "password",
    length: 45
  })
  password : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;
}