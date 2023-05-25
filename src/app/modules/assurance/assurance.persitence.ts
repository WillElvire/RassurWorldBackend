import { AssuranceRepository } from './../../repository/Assurance.repository';
import { ReturnMessage } from './../../common/classes/message';
const assuranceRepository = AssuranceRepository;
export class AssurancePersistence {

    async addNewTripRequest(tripDetail) {
       let message  = new ReturnMessage();
       try {
        
            
       }catch(Exception) {
         message.message = Exception.message;
         message.code    = 500;
       }

       return message;
    }

}