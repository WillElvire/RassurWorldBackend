import { JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity,BaseEntity } from 'typeorm';
import { User } from './User';
import { Offer } from './Offer';
import { Detail } from './Detail';

@Entity()
export class Assurance  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
   id : string;
   @Column()
   isPayed : boolean;
   @Column()
   isActive  : boolean;
   @Column()
   date : Date;
   @ManyToOne(()=> User)
   user : User;
   @ManyToOne(()=>Offer)
   offer : Offer;
   @OneToOne(()=>Detail)
   @JoinColumn()
   detail : Detail;
   @Column()
   createdAt : Date;
}

