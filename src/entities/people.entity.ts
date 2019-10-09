import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";

@Entity('People')
export class People 
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
    name: "nameOne",
    length: 50
  })
  nameOne : string;

  @Column({
    nullable: false,
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
    type: "varchar",
    name: "direction",
    length: 110
  })
  direction : string;
}