import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Entity, } from 'typeorm';

@Entity()
export class Offer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
   id : string;
}