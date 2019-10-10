import { Column, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";
import { State } from "./enums/state.enum";
import { Book } from "./book.entity";

@Entity()
export class Category{

  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : string;

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

  @OneToMany(type => Book, book => book.category)
  book : Book[];
}