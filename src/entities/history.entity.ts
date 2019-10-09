import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity('History')
export class History
{
  @PrimaryGeneratedColumn()
  public authorToBook: number;

  @Column()
  public authorId! : number;

  @Column()
  public bookId! : number;

  @Column({
    nullable: false,
    type: "int",
    name: "cant"
  })
  public cant! : number;
  
  
}
