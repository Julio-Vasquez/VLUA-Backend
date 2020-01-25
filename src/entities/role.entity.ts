import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, OneToMany } from 'typeorm';

import { State } from './enums/state.enum';
import { User } from './user.entity';

@Entity('Role')
export class Role
{
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn({
    unique: true
  })
  id : string;

  @Column({
    nullable: false,
    type: "varchar",
    length: 30,
    name: "role"
  })
  role : string;

  @Column({
    nullable: false,
    type : "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToMany(type => User, user => user.role)
  user : User[];
}