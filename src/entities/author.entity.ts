import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, ManyToOne, JoinColumn } from "typeorm";

import { Book } from "./book.entity";
import { Gender } from './gender.entity';
import { State } from "./enums/state.enum";

@Entity('Author')
@Index( ["name", "lastName"], { unique : true })
export class Author
{
  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "name",
    length: 120
  })
  name : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "lastName",
    length: 120
  })
  lastName : string;

  @Column({
    nullable: true,
    type: "date",
    name: "dateBirth"
  })
  dateBirth : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToMany(type => Book, book => book.author, { nullable : false })
  book : Book[];

  @ManyToOne(type => Gender, gender => gender.people, { nullable : false })
  @JoinColumn()
  gender : Gender;
}