import { Column, CreateDateColumn, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity ,BaseEntity } from 'typeorm';
import { Rate } from './Rate';

@Entity()
export class Detail  extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
   id : string;
  
   @Column({nullable:true})
   destination : string;
   @Column({nullable:true})
   country : string;
   @Column({nullable:true})
   nationality : string;
   @Column({nullable:true})
   dateOfLeft : string;
   @Column({nullable:true})
   deteOfBack : string;
   @Column({nullable:true})
   passportNub : string;
   @Column({nullable:true})
   passportValidity : string;
   @Column({nullable:true})
   relationship : string;
   @Column({nullable:true})
   agentName : string;
   @Column({nullable:true})
   tripMotif : string; 
   @Column({nullable:true}) 
   passportPhoto : string;
   @CreateDateColumn()
   public createdAt !: string;
   @ManyToOne(()=>Rate)
   rate : Rate;
}