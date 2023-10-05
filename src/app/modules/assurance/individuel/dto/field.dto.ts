export interface IndividuelleSanteDto {
  id:string;
  principal_activity?: string;
  warn_tool_used?: string;
  other_activity?: string;
  sport_activity?: string;
  circulation?: boolean;
  isAssured?: boolean;
  society?: string;
  salary?: string;
  taille?: string;
  poids?: string;
  usage?: string;
  surdite?: string;
  vision?: string;
  pathologie?: string;
  infirmite?: string;
  degre_infirmite?: string;
  maladie_chronique?: string;
  autre?: string;
}

export interface BeneficiaryDto {
  id?: string;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: string;
  job?: string;
  death?: string;
  ipt?: string;
  medicalFees?: string;
  user?:string;
}
