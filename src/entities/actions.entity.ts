import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { State } from "./enums/state.enum";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity('Actions')
export class Actions 
{
  @PrimaryColumn({
    nullable: false
  })
  roleId : string;

  @PrimaryColumn({
    nullable: false
  })
  permissionId : string;

  @Column({
    nullable: false,
    type: "enum",
    enum: State,
    name: "state"
  })
  state : State;

  @ManyToOne(type => Role, role => role.actions)
  @JoinColumn()
  role : Role;

  @ManyToOne(type => Permission, permission => permission.actions)
  @JoinColumn()
  permission : Permission;
  
}