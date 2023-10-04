
export interface AuditDto {
  id?: string;
  userId?: string;
  source?: string;
  old_value?: string;
  new_value?: string;
  action?: AuditAction;
}

export enum AuditAction {
  SUPPRESSION = 1,
  AJOUT = 2,
  TRANSACTION = 3,
  DEMANDE = 5,
  CONNECTION = 6,
  DECONNEXION = 7,
  DEPOSIT = 8,
  WITHDRAWALL = 9,
  INSCRIPTION = 10
}
