import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Entity } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
   id : string;
}