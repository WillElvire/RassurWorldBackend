import { ReturnMessage } from "../../../common/classes/message";
import { UserService } from "../../user/user.service";
const userService =  new UserService();
export class AutoService {
 
    async setupFirstStep(user){
        
        let message = new ReturnMessage();

        if(!user.email || !user.firstname || !user.lastname || !user.phone){
          message.code = 421;
          message.message = "Kindly fill all required fields";
          return message;
        }
  
        return await userService.addPartialUser(user,"auto");
    }

    setupSecondStep() {

    }

    setupThirdStep() {
        
    }
    
}