import { OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { ReceiptDto } from "./dto/receipt.dto";
import { ReceiptRepository } from "../../repository/Receipt.repository";

export class ReceiptPersistence {
    private _rReceiptRepository = ReceiptRepository;

    async save(receipt : ReceiptDto) {
        let message = new ReturnMessage();
       try 
       {
        
            const newUser   = this._rReceiptRepository.create({...receipt} as any);
            const result    = await this._rReceiptRepository.save(newUser);
            message.returnObject = result;
            message.code = OK;
            message.message = "Role enregisté avec succes";
            return message;
       
        }catch(Exception) {
           message.code = 500;
           message.message = Exception.message;
        }
        return message;
    }


    async find() {
        let message = new ReturnMessage();
        try {
            const result = await this._rReceiptRepository.find();
            message.code = OK;
            message.returnObject = result;
  
        }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
        }
  
        return message; 
    }


    async getReceiptByid(id) {
        let message  = new ReturnMessage();
        try {

           const result = await this._rReceiptRepository.createQueryBuilder().where("id =  :id or photoUrl  = :id ",{
              id
           }).getExists();
  
           message.code = 200;
           message.returnObject = result;
  
        }catch(Exception) {
           message.code = 500;
           message.message = Exception.message;
        }
        return message; 
      }
 
}