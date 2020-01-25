import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";

import { State } from './enums/state.enum';
import { Book } from "./book.entity";

@Entity('Editorial')
@Index( ["name"], { unique : true })
export class Editorial
{
  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 100,
    name: "name"
  })
  name : string;
  
  @Column({
    nullable: true,
    type: "varchar",
    length: 80,
    name: "direction"
  })
  direction : string;

  @Column({
    nullable: false,
    type : "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToMany(type => Book, book => book.editorial)
  book : Book[];
}