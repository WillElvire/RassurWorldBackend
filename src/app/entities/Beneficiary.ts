import { Assurance } from './Assurance';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Beneficiary extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id : string;
    @Column({nullable : true})
    public firstname : string;
    @Column({nullable : true})
    public lastname : string;
    @Column({nullable : true})
    public dateOfBirth : string;
    @Column({nullable : true})
    public job : string;
    @Column({nullable : true})
    public death : string;
    @Column({nullable : true})
    public ipt : string;
    @Column({nullable : true})
    public medicalFees : string
    @ManyToOne(()=> User)
    user : User;
    @Column({nullable: true})
    assuranceId : string;
    @Column({nullable:true})
    isActive  : boolean;
    @CreateDateColumn({nullable : true}) 
    createdAt : Date; 
    @CreateDateColumn({nullable : true}) 
    updatedAt : Date; 

}