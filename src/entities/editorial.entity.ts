import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { State } from './enums/state.enum';

@Entity('Editorial')
export class Editorial
{
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id"
  })
  @PrimaryColumn({
    unique: true,
    nullable: false
  })
  id : number;

  @Column({
    nullable: false,
    type: "varchar",
    length: 30,
    name: "name"
  })
  name : string;
  
  @Column({
    nullable: true,
    type: "varchar",
    length: 80,
    name: "direction"
  })
  direction : string;

  @Column({
    nullable: false,
    type : "enum",
    enum: State,
    name: "state"
  })
  state : State;
}