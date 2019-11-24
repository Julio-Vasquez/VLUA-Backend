import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { State } from './enums/state.enum';
import { TypeDocs } from './enums/typedoc.enum';
import { People } from "./people.entity";

@Entity('TypeDoc')
export class TypeDoc
{
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: TypeDocs,
    name: "typeDoc"
  })
  typeDoc : TypeDocs;

  @Column({
    nullable: false,
    type : "enum",
    enum: State,
    name: "state"
  })
  state : State; 

  @OneToMany(type => People, user => user.typeDoc)
  people : People[];
  
}