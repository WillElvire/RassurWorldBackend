import { Column, CreateDateColumn } from 'typeorm';
import { BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
export class PaymentLink extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id : string;
    @Column()
    expiration_date : string;
    @CreateDateColumn({nullable : true})
    createdAt : Date;
    
    
}