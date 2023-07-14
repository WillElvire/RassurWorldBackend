import { User } from "../../../entities/User";

export interface ReceiptDto {
  id?: string;
  photoUrl: string;
  createdAt?: string;
  user ?: any ;
}
