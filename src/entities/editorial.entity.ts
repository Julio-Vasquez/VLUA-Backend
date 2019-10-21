import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { State } from './enums/state.enum';
import { Book } from "./book.entity";

@Entity('Editorial')
export class Editorial
{
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
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