import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { State } from './enums/state.enum';
import { Actions } from './actions.entity';

@Entity('Permission')
export class Permission 
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
    name: "title",
    length: 150
  })
  title: string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "icon"
  })
  icon : string;

  @Column({
    nullable: false,
    type: "text",
    name: "url"
  })
  url : string;

  @Column({
    nullable: false,
    type : "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @OneToMany(type => Actions, actions => actions.role)
  @JoinColumn()
  actions : Actions[];

}