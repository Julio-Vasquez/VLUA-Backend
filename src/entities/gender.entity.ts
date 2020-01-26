import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Genders } from './enums/gender.enum'
import { State } from "./enums/state.enum";
import { People } from "./people.entity";
import { Author } from "./author.entity";

@Entity('Gender')
export class Gender {

  @PrimaryGeneratedColumn("uuid")
  id : string; 

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

  @OneToMany(type => People, user => user.gender, { nullable : false })
  people : People[];

  @OneToMany(type => People, user => user.gender, { nullable : false })
  author : Author[];
}