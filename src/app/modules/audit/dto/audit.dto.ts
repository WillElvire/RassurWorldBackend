import { User } from "../../../entities/User";

export interface AuditDto {
    id: string
    userId : string;
    source : string;
    old_value : string;
    new_value : string; 
}

export enum AuditType {
    SUPPRESSION = 1 ,
    AJOUT = 2 ,
    TRANSACTION = 3,
    DEMANDE = 5
}  