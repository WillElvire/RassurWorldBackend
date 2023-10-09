
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestType } from "../common/classes/message";
import { User } from "./User";

@Entity()
export class Request extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({nullable : true})
    public type : RequestType;
    @Column({nullable : true})
    public amount : string;
    @ManyToOne(()=>User)
    public user : User;
    @Column({nullable : true}) 
    public fees : string;
    @Column({nullable : true}) 
    public isPayed : boolean;
    @CreateDateColumn({nullable : true})
    public createdAt : string;
}