import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
   dateOfLeft : string;
   @Column({nullable:true})
   dateOfBack : string;
   //@Column({nullable:true})
   //passportNub : string;
   //@Column({nullable:true})
  // passportValidity : string;
   @Column({nullable:true})
   relationship : string;
   @Column({nullable:true})
   agentName : string;
   @Column({nullable:true})
   tripMotif : string; 
   //@Column({nullable : true})
   //passportDayOfCreation : string;
   @Column({nullable:true}) 
   passportPhoto : string;
   @Column({nullable : true})
   cartePhoto : string;
   @Column({nullable : true})
   typeTiers : string;
   @Column({nullable : true})
   date_a_effet : string;
   @Column({nullable : true})
   valeur_a_neuf : string;
   @Column({nullable : true})
   periodicity : string;
   @Column({nullable : true})
   price : string;
   @CreateDateColumn()
   public createdAt !: string;
   @ManyToOne(()=>Rate)
   rate : Rate;

  
}