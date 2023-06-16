import { CreateDateColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity,BaseEntity } from 'typeorm';
import { User } from './User';
import { Offer } from './Offer';
import { Detail } from './Detail';
import { Transactions } from './Transactions';

@Entity()
export class Assurance  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
   id : string;
   @Column()
   isPayed : boolean;
   @Column()
   isActive  : boolean;
   @CreateDateColumn({nullable : true}) 
   date : string;
   @ManyToOne(()=> User)
   user : User;
   @ManyToOne(()=>Offer)
   offer : Offer;
   @OneToOne(()=>Detail)
   @JoinColumn()
   detail : Detail;
   @OneToOne(()=>Transactions)
   @JoinColumn()
   transaction  : Transactions;
   @CreateDateColumn({nullable : true}) 
   createdAt : Date;
}

