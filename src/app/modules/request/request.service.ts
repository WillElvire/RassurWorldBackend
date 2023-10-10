import { OK } from "http-status-codes";
import { ReturnMessage } from "../../../../../jobs/relationship/src/domain/modules/mail/dto/message";
import { WalletService } from "../wallet/wallet.service";
import { RequestDto } from "./dto/request.dto";
import { RequestPersistence } from "./request.persistence";
const walletService = new WalletService;
export class RequestService {
    private requestPersistence  =  new RequestPersistence();
    async save(request : RequestDto) {
      return await this.requestPersistence.save(request);
    }

    async getRequestById(id : string) {
        return await this.requestPersistence.getRequestById(id);
    }

    async getRequestByUserId(id : string) {
        return await this.requestPersistence.getRequestByUserId(id);
    }

    async getRequest() {
        return await this.requestPersistence.getRequest();
    }
    async confirmRequest(id : string,amount : string , userId : string){
        let message = new ReturnMessage();
        message = await this.requestPersistence.confirmRequest(id);
        if(message.code == OK) {
            message = await walletService.debitAccount(amount,userId);
            message.message = "Transaction confirmé avec succes";
            return message;
        }
        return message;
       
    }
    
}