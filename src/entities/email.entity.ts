import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { State } from "./enums/state.enum";
import { User } from "./user.entity";

@Entity('EMail')
export class EMail
{
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : string;

  @Column({
    nullable: false,
    type: "text",
    name: "email"
  })
  email : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @ManyToOne(type => User, user => user.eMail)
  @JoinColumn()
  user : User;
}