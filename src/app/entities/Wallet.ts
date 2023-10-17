import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Wallet  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    public id: string
    @Column({default : 0 , nullable : true})
    public balance : number
    @Column({default : 0 , nullable : true})
    public freeze_amount : number
    @CreateDateColumn()
    createdAt : Date;
}