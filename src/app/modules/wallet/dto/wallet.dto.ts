import { User } from "../../../entities/User";

export interface WalletDto {
  id?: string;
  balance?: number;
  freeze_amount?: number;
  user?: User | string;
}
