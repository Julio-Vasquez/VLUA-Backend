import { Column, Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Category{

  @PrimaryGeneratedColumn({
    type:"bigint", 
    name:"id"
  })
  @PrimaryColumn()
  id : number;

  @Column({
    nullable: false,
    type: "varchar",
    name: 'name',
    length: 150
  })
  name : string;
  
}