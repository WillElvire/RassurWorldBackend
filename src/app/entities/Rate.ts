import { JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Partners } from './Partners';
import { Detail } from './Detail';

@Entity()
export class Rate  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
   id : string;
   @Column()
   day : number;
   @Column()
   price : number;
   @Column()
   isActive : boolean;
   @CreateDateColumn({nullable : true})
   public createdAt : string;
   @ManyToOne(()=>Partners,(partner) => partner.id)
   public partners : Partners;
  
}