import { Entity, PrimaryGeneratedColumn, Column,BaseEntity, OneToMany, JoinColumn, OneToOne, CreateDateColumn, ManyToOne } from "typeorm"
import { Role } from "./Role";

@Entity("User")
export class User  extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id: string
    @Column()
    public firstname: string
    @Column()
    public lastname: string
    @Column({unique : true})
    public email: string;
    @Column({unique : true}) 
    public phone : string;
    @ManyToOne(()=> Role)
    @JoinColumn()
    public role : string;
    @Column({nullable : true})
    public password : string;
    @Column({nullable : true, default : 0})
    public useWhatsapp ?: boolean;
    @Column({nullable : true, default : 0})
    public isCollaborateur ?: boolean;
    @CreateDateColumn()
    public date_naissance !: string;
    @Column({default : 0 , nullable : true})
    public isActive !: boolean;
    @Column({nullable : true})
    public tryCount !: number;
    @CreateDateColumn({nullable : true}) 
    public lastConnection !: string
    @Column({nullable:true})
    country  : string;

}
