import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { User } from './user.entity';
import { Gender } from './gender.entity'; 
import { State } from './enums/state.enum';

@Entity('People')
export class People 
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
}