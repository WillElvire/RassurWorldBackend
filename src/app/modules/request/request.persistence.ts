import { OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { RequestRepository } from "../../repository/Request.repository";
import { RequestDto } from "./dto/request.dto";
const _rRequestRepository =  RequestRepository;
export class RequestPersistence {
  

    async save(request : RequestDto) {
        let message = new ReturnMessage();
       try 
       {
            const newUser   = _rRequestRepository.create({...request} as any);
            const result    = await _rRequestRepository.save(newUser);
            message.returnObject = result;
            message.code = OK;
            message.message = "Votre requette est en cours de traitement";
            return message;
       
        }catch(Exception) {
           message.code = 500;
           message.message = Exception.message;
        }
        return message;
    }
}