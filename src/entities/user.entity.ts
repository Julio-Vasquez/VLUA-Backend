import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, Index } from "typeorm";

import { State } from "./enums/state.enum";
import { People } from "./people.entity";
import { Role } from "./role.entity";
import { Phone } from "./phone.entity";
import { EMail } from "./email.entity";
import { History } from './history.entity';

@Entity('User')
@Index( ["userName"], { unique: true } )
export class User
{
  @PrimaryGeneratedColumn("uuid")
  id : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "userName",
    length: 45
  })
  userName : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "password",
    length: 45
  })
  password : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToOne(type => People, people => people.user, { nullable : false })
  @JoinColumn()
  people : People;

  @ManyToOne(type => Role, role => role.user, { nullable : false })
  @JoinColumn()
  role : Role;

  @OneToMany(type => Phone, phone => phone.user, { nullable : false } )
  phone : Phone[];

  @OneToMany(type => EMail, eMail => eMail.user, { nullable : false })
  eMail : EMail[];

  @OneToMany(type => History, history => history.user, { nullable : false })
  history : History[];
}