import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn, ManyToOne, Index } from "typeorm";

import { State } from "./enums/state.enum";
import { User } from "./user.entity";

@Entity('Phone')
@Index( ["phone"], { unique : true })
export class Phone
{
  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    type: "int",
    name: "phone"
  })
  phone : number;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @ManyToOne(type => User, user => user.phone)
  @JoinColumn()
  user : User;
}