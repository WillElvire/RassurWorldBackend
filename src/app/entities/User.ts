import { Entity, PrimaryGeneratedColumn, Column,BaseEntity, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { Role } from "./Role";

@Entity("User")
export class User  extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    protected id: string
    @Column()
    protected firstname: string
    @Column()
    protected lastname: string
    @Column({unique : true})
    protected email: string;
    @Column({unique : true}) 
    protected phone : string;
    @OneToOne(()=> Role)
    @JoinColumn()
    protected role : string;
    @Column()
    protected password : string;
    

}
