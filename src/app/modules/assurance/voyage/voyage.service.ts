import { UserService } from '../../user/user.service';
import { ReturnMessage } from './../../../common/classes/message';
import { userVoyageFirstStepDto } from './dto/user.dto';
const userService =  new UserService();
export class VoyageService {

    

    async setupFirstStep(user : userVoyageFirstStepDto){

      let message = new ReturnMessage();

      if(!user.email || !user.firstname || !user.lastname || !user.phone){
        message.code = 421;
        message.message = "Kindly fill all required fields";
        return message;
      }

      return await userService.addPartialUser(user);
    }

    setupSecondStep() {

    }

    setupThirdStep() {
        
    }
}