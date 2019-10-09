import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";
import { Genders } from './enums/gender.enum'
import { State } from "./enums/state.enum";

@Entity('Gender')
export class Gender
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
    type: "enum",
    name: "gender",
    enum: Genders
  })
  gender : Gender;

  @Column({
    nullable: false,
    type: "enum",
    name: "state",
    enum: State
  })
  state : State;
}