import { BeneficiaryService } from './../../beneficiary/beneficiary.service';
import { OK } from 'http-status-codes';
import { ReturnMessage } from "../../../common/classes/message";
import { UserService } from "../../user/user.service";
import { AssurancePersistence } from "../assurance.persitence";
import { BeneficiaryDto } from './dto/field.dto';

const userService = new UserService();
const assurancePersistence = new AssurancePersistence();
const beneficiaryService = new BeneficiaryService();

export class IndividuelService {
    
    async setupFirstStep(user) {
        let message = new ReturnMessage();
        if (!user.email || !user.firstname || !user.lastname || !user.phone) {
          message.code = 421;
          message.message = "Kindly fill all required fields";
          return message;
        }
        return await userService.addPartialUser(user, "auto");
    }


    async setupThirdStep(beneficaries:BeneficiaryDto[]) {
        return await beneficiaryService.addBeneficiary(beneficaries);
    }


    async setupSecondStep(trip) {
        let message = new ReturnMessage();
    
        if (!trip.offer || !trip.user || !trip.trip) {
          message.code = 421;
          message.message = "Kindly fill all required fields";
          return message;
        }
    
        message = await userService.getUserById(trip.user);
        if (!message.returnObject) {
          message.code = 500;
          message.message = "Error during second step creation";
          return message;
        }
    
        if(!!trip.parrainCode) {
          message = await userService.fetchUserByCode(trip.parrainCode);
          if(message.code != OK)  return message;
          return await assurancePersistence.addNewTripRequest(trip);
        }
        return await assurancePersistence.addNewTripRequest(trip);
      }

}