import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { State } from './enums/state.enum';
import { TypeDocs } from './enums/typedoc.enum';

@Entity('TypeDoc')
export class TypeDoc
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
  
}