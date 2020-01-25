import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm";

import { State } from "./enums/state.enum";
import { Book } from "./book.entity";

@Entity('Category')
@Index( ["name", "code"], { unique : true })
export class Category{

  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "code",
    length: 3
  })
  code : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: 'name',
    length: 50
  })
  name : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToMany(type => Book, book => book.category)
  book : Book[];
}