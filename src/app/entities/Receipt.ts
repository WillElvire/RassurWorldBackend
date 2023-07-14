import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Receipt extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public user : string;
  public photoUrl: string;
  @CreateDateColumn({nullable : true})
  public createdAt : string;

}