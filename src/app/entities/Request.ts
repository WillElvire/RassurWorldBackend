
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestType } from "../common/classes/message";
import { User } from "./User";

@Entity()
export class Request extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({nullable : true , default : 1})
    public type : RequestType;
    @Column({nullable : true,default : 0})
    public amount : string;
    @ManyToOne(()=>User)
    public user : User;
    @Column({nullable : true , default : 0}) 
    public fees : string;
    @Column({nullable : true,default : 0}) 
    public isPayed : boolean;
    @Column({nullable : true,default : 0}) 
    public isConfirmed : boolean;
    @CreateDateColumn({nullable : true})
    public createdAt : string;
}