import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { State } from "./enums/state.enum";

@Entity('Phone')
export class Phone
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
    type: "int",
    name: "phone",
    length: 10
  })
  phone : number;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;
}