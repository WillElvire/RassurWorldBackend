import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Audit extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string
    @ManyToOne(()=> User)
    user : User;
    @Column()
    source : string;
    @Column({nullable : true,type : 'text'})
    old_value : string;
    @Column({nullable : true,type : 'text'})
    new_value : string; 
    @Column({nullable : true})
    action : string;
    @CreateDateColumn({nullable : true}) 
    createdAt : Date; 
    @CreateDateColumn({nullable : true}) 
    updatedAt : Date; 
}