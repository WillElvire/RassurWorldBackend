import { OK } from "http-status-codes";
import { WalletService } from "../wallet/wallet.service";
import { RequestDto } from "./dto/request.dto";
import { RequestPersistence } from "./request.persistence";
import { ReturnMessage } from "../../common/classes/message";
const walletService = new WalletService;
export class RequestService {
    private requestPersistence  =  new RequestPersistence();
    async save(request : RequestDto) {
        let message = new ReturnMessage();
        message = await walletService.verifyUserFunds(request.amount,request.user);
        if(message.code == 200) {
            const balance = message.returnObject;
            message =  await this.requestPersistence.save(request);
            if(message.code == 200) {
                message.returnObject = balance;
                return message;
            }
            return message;
        }
        return message;
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
            if(message.code == 200) {
                message.message = "Transaction confirmé avec succes";
                return message;
            }
            return message;
          
        }
        return message;
       
    }
    
}