import { PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class Partners extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column({ nullable: false })
  public fullName: string;
  @Column({ nullable: true })
  public phone: string;
  @Column({ nullable: true })
  public description: string;
}
