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
    name: "name",
    length: 120
  })
  name : string;

  @Column({
    nullable: false,
    type: "varchar",
    name: "lastName",
    length: 120
  })
  lastName : string;


  @Column({
    nullable: false,
    type: "date",
    name: "dateBirth"
  })
  dateBirth : string;
}