import { PrimaryGeneratedColumn, BaseEntity, Column, OneToMany, JoinColumn } from "typeorm";
import { Entity } from "typeorm";
import { Rate } from "./Rate";

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
  @OneToMany(()=>Rate,(rate) => rate.id)
  @JoinColumn()
  public rate : Rate;
}
