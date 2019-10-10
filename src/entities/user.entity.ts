import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { State } from "./enums/state.enum";
import { People } from "./people.entity";
import { Role } from "./role.entity";
import { TypeDoc } from "./typedoc.entity";
import { Phone } from "./phone.entity";
import { EMail } from "./email.entity";
import { History } from './history.entity';

@Entity('User')
export class User
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

  @OneToOne(type => People, people => people.user)
  @JoinColumn()
  people : People;

  @ManyToOne(type => Role, role => role.user)
  @JoinColumn()
  role : Role;

  @ManyToOne(type => TypeDoc, typeDoc => typeDoc.user)
  @JoinColumn()
  typeDoc : TypeDoc;

  @OneToMany(type => Phone, phone => phone.user)
  phone : Phone[];

  @OneToMany(type => EMail, eMail => eMail.user)
  eMail : EMail[];

  @OneToMany(type => History, history => history.user)
  history : History[];
}