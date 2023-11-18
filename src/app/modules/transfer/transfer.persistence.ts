import { OK } from 'http-status-codes';
import { ReturnMessage } from "../../common/classes/message";
import { TransferRepository } from "../../repository/Transfer.repository";
import { RemoteConfig, TransferDto } from "./dto/transfer.dto";



export class TransferPersistence { 

    private _rTransferRepository =  TransferRepository;


    async getTransfer() {
        let message = new ReturnMessage();
        try 
        {
            const result = await this._rTransferRepository.find();
            message.code = OK;
            message.returnObject = result;
        }catch(Exception) {
            message.code    = 500;
            message.message = Exception.message;
        }
        return message;
    }
    async addTransfer(transfer : TransferDto) {
        let message = new ReturnMessage();

        try{
            const newTransfer = this._rTransferRepository.create(transfer as any); 
            const result         = await this._rTransferRepository.save(newTransfer);
            message.code         = OK;
            message.returnObject = result;
            message.message      = "Transaction successfully added !";
        }catch(Exception) {
            message.code    = 500;
            message.message = Exception.message;
        }
      
        return message;
    }
}