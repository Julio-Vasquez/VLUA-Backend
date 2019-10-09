import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from "typeorm";

@Entity('Author')
export class Author
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
    length: 75
  })
  nameOne : string;

  @Column({
    nullable: true,
    type: "varchar",
    name: "nameTwo",
    length: 80
  })
  nameTwo : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "lastNameOne",
    length: 80
  })
  lastNameOne : string;

  @Column({
    nullable: true,
    type: "varchar",
    name: "lastNameTwo",
    length: 80
  })
  lastNameTwo : string;

  @Column({
    nullable: false,
    type: "date",
    name: "dateBirth"
  })
  dateBirth : string;
}