import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transactions  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;
    @Column("text",{nullable: true})
    apiResponse : string;
    @Column({nullable : true})
    quantity : number;
    @Column({nullable : true})
    total_net : number;
    @Column({nullable : true})
    total : number;
    @Column({nullable : true})
    fees : number;
    @CreateDateColumn()
    createdAt : Date;
    @Column({nullable : true})
    updatedAt : Date;
    @Column({nullable : true})
    meanOfPayment : string;
    @Column({nullable : true})
    transactionNumb : string;
}