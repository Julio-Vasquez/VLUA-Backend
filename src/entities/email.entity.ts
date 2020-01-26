import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Index } from "typeorm";

import { State } from "./enums/state.enum";
import { User } from "./user.entity";

@Entity('EMail')
@Index(["eMail"], { unique : true })
export class EMail
{
  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    name: "email"
  })
  eMail : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @ManyToOne(type => User, user => user.eMail, { nullable : false })
  @JoinColumn()
  user : User;
}