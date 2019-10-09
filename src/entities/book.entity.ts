   //isbn
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Index } from 'typeorm';


@Entity('Book')
@Index(["isbn", "name"],{unique: true})
export class Book 
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
      name: "isbn",
      length: 20
   })
   isbn : string;

   @Column({
      nullable: false,
      type: "varchar",
      name: "name",
      length: 180
   })
   name : string;

   @Column({
      nullable: false,
      type: "date",
      name: "publication"
   })
   publication : string;

   @Column({
      nullable: true,
      type: "int",
      name: "edition"
   })
   edition : number;
   
   @Column({
      nullable: true,
      type: "int",
      name: "tomo"
   })
   tomo : number; 

}