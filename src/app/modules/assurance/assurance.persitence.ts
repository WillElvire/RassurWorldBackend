import { AssuranceRepository } from './../../repository/Assurance.repository';
import { ReturnMessage } from './../../common/classes/message';
import { DetailRepository } from '../../repository/Detail.repository';

const assuranceRepository = AssuranceRepository;
const detailRepository    = DetailRepository;

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