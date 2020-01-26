import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";

import { User } from "./user.entity";
import { Book } from "./book.entity";
import { State } from "./enums/state.enum";

@Entity('History')
export class History
{
  @PrimaryColumn()
  userId : string;

  @PrimaryColumn()
  bookId : string;

  @Column({
    nullable: false,
    type: "int",
    name: "cant"
  })
  cant : number;

  @CreateDateColumn()
  lastDate : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;
  
  @ManyToOne(type => User, user => user.history, { nullable : false })
  @JoinColumn()
  user : User;

  @ManyToOne(type => Book, book => book.history, { nullable : false })
  @JoinColumn()
  book : Book;

}