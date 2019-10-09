import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { State } from './enums/state.enum';
import { Permission } from './permission.entity';


@Entity('Role')
export class Role
{
  @PrimaryGeneratedColumn({
    type:"bigint", 
    name:"id"
  })
  @PrimaryColumn({
    unique: true
  })
  id : number;

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

  @ManyToMany(type => Permission, permission => permission.rol)
  @JoinTable({ name: 'rol_permiso_fk'})
  permission : Permission[];

}