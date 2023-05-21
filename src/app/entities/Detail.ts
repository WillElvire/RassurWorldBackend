import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity ,BaseEntity } from 'typeorm';

@Entity()
export class Detail  extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
   id : string;
}