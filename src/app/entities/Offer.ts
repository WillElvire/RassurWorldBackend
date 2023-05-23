import { PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn } from 'typeorm';
import { Entity, } from 'typeorm';

@Entity()
export class Offer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
   id : string;
   @Column()
   libelle : string;
   @Column()
   description : string;
   @Column()
   isActive : boolean;
   @CreateDateColumn({nullable : true})
   createdAt !: string;

}