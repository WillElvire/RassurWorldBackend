import { RequestType } from "../../../common/classes/message";


export interface RequestDto {
  id?: string;
  type?: RequestType;
  amount?: string;
  user?: string;
  fees?: string;
  isPayed?: boolean;
  createdAt?: string;
  isConfirmed?:boolean;
}
