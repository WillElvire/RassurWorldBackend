import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Partners  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
   id : string;
}