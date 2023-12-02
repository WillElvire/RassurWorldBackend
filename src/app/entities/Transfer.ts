import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transfer extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;
    @Column({nullable : true , type : 'varchar' , length : '100'})
    provider : string
    @Column({nullable : true , type : 'text' })
    request : string;
    @Column({nullable : true , type : 'text' })
    response : string;
    @Column({nullable : true })
    ip : string;
    @Column({nullable : true })
    browser : string;
    @Column({nullable : true })
    apiPath : string;
    @CreateDateColumn({nullable : true})
    public createdAt : string;
    @UpdateDateColumn({nullable : true})
    public updatedAt : string;
}