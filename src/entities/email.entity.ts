import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { State } from "./enums/state.enum";

@Entity('EMail')
export class EMail
{
  @PrimaryGeneratedColumn({
    type:"bigint", 
    name:"id"
  })
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : number;

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
}