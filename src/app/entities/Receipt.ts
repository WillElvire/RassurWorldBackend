import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Receipt extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public photoUrl: string;
  @CreateDateColumn({nullable : true})
  public createdAt : string;
}