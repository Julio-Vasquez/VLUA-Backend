import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, Index } from "typeorm";

import { User } from './user.entity';
import { Gender } from './gender.entity'; 
import { TypeDoc } from './typedoc.entity';
import { State } from './enums/state.enum';

@Entity('People')
@Index(["identification"],{ unique: true })
export class People 
{
  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "nameOne",
    length: 50
  })
  nameOne : string;

  @Column({
    nullable: true,
    type: "varchar",
    name: "nameTwo",
    length: 55
  })
  nameTwo : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "lastNameOne",
    length: 60
  })
  lastNameOne : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "lastNameTwo",
    length: 65
  })
  lastNameTwo : string;

  @Column({
    nullable: false,
    type: "date",
    name: "birthDate"
  })
  birthDate : string;

  @Column({
    nullable: false,
    type: "bigint",
    name: "identification"
  })
  identification : number;
  

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToOne(type => User, user => user.people)
  user : User;

  @ManyToOne(type => Gender, gender => gender.people)
  @JoinColumn()
  gender : Gender;

  @ManyToOne(type => TypeDoc, typeDoc => typeDoc.people)
  @JoinColumn()
  typeDoc : TypeDoc;
}