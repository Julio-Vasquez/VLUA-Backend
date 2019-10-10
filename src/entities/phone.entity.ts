import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { State } from "./enums/state.enum";
import { User } from "./user.entity";

@Entity('Phone')
export class Phone
{
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
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