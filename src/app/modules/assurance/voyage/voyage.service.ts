import { AssurancePersistence } from './../assurance.persitence';
import { UserService } from '../../user/user.service';
import { ReturnMessage } from './../../../common/classes/message';
import { TripFieldDto } from './dto/field.dto';
import { userVoyageFirstStepDto } from './dto/user.dto';
const userService =  new UserService();
const assurancePersistance = new AssurancePersistence();

export class VoyageService {

    
  async setupFirstStep(user : userVoyageFirstStepDto){
    let message = new ReturnMessage();
    if(!user.email || !user.firstname || !user.lastname || !user.phone){
      message.code = 421;
      message.message = "Kindly fill all required fields";
      return message;
    }
    return await userService.addPartialUser(user,"voyage");
  }

  async setupSecondStep(trip : TripFieldDto) {
    return await assurancePersistance.addNewTripRequest(trip);
  }

  setupThirdStep() {
      
  }
}