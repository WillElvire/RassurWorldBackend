import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Audit {
    @PrimaryGeneratedColumn("uuid")
    public id: string
    @ManyToOne(()=> User)
    user : User;
    @Column()
    source : string;
    @Column({nullable : true})
    old_value : string;
    @Column({nullable : true})
    new_value : string; 
    @CreateDateColumn({nullable : true}) 
    createdAt : Date; 
    @CreateDateColumn({nullable : true}) 
    updatedAt : Date; 
}