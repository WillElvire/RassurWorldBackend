import { Assurance } from './Assurance';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Beneficiary {
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
    public medicalFees : string;
    @ManyToOne(()=> User)
    user : User;
    @ManyToOne(()=>Assurance)
    assurance : Assurance;
    @Column({nullable:true})
    isActive  : boolean;
    @CreateDateColumn({nullable : true}) 
    createdAt : Date; 
    @CreateDateColumn({nullable : true}) 
    updatedAt : Date; 

}