import { Column, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";
import { State } from "./enums/state.enum";

@Entity()
export class Category{

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
    type: "varchar",
    name: 'name',
    length: 150
  })
  name : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;
}