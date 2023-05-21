import { PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";
import { Entity } from "typeorm";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  libelle: string;
  @Column({unique : true})
  flag : number;
}
