import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { State } from './enums/state.enum';
import { Role } from './role.entity';

@Entity('Permission')
export class Permission 
{
  @PrimaryGeneratedColumn({
    type:"bigint", 
    name:"id"
  })
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : number;

  @Column({
    nullable: false,
    type: "varchar",
    name: "title",
    length: 150
  })
  title: string;

  @Column({
    nullable: false,
    type: "varchar2",
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

  @ManyToMany(type => Role, role => role.permission)
  @JoinTable({ name: 'rol_permiso_fk'})
  rol : Role[];

}