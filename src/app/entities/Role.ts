import { PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column()
  public libelle: string;
  @Column({unique : true})
  public flag : number;
  @CreateDateColumn({nullable : true})
  public createdAt : string;
}
