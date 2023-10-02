import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Wallet  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    public id: string
    @Column({default : 0 , nullable : true})
    public balance : number
    @Column({default : 0 , nullable : true})
    public freeze_amount : number
    @OneToOne(()=>User)
    @JoinColumn()
    user : User;
    @CreateDateColumn()
    createdAt : Date;
}