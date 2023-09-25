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
   @Column({nullable : true})
   principal_activity : string;
   @Column({nullable : true})
   warn_tool_used : string;
   @Column({nullable : true})
   other_activity : string;
   @Column({nullable : true})
   sport_activity : string;
   @Column({nullable : true,default : true})
   circulation : boolean;
   @Column({nullable : true,default : false})
   isAssured : boolean;
   @Column({nullable : true})
   society : string;
   @Column({nullable : true})
   salary : string;
   @Column({nullable : true})
   taille : string;
   @Column({nullable : true})
   poids : string;
   @Column({nullable : true})
   usage : string;
   @Column({nullable : true})
   surdite : string;
   @Column({nullable : true})
   vision : string;
   @Column({nullable : true})
   pathologie : string;
   @Column({nullable : true})
   infirmite : string;
   @Column({nullable : true})
   degre_infirmite : string;
   @Column({nullable : true})
   maladie_chronique : string;
   @Column({nullable : true})
   autre : string;
   
   @CreateDateColumn()
   public createdAt !: string;
   @ManyToOne(()=>Rate)
   rate : Rate;

  
}