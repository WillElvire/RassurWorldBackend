import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity,BaseEntity } from 'typeorm';

@Entity()
export class Assurance  extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
   id : string;
}

