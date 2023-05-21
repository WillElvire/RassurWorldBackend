import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Rate  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
   id : string;
}