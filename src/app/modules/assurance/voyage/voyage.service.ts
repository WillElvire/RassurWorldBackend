import { AssurancePersistence } from './../assurance.persitence';
import { UserService } from '../../user/user.service';
import { ReturnMessage } from './../../../common/classes/message';
import {  fullTripDetail } from './dto/field.dto';
import { userVoyageFirstStepDto } from './dto/user.dto';

const userService =  new UserService();
const assurancePersistence = new AssurancePersistence();

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


  async  passportFileUpload(passport){
    let message = new ReturnMessage();
  }
  
  async setupSecondStep(trip : fullTripDetail) {
    let message = new ReturnMessage();

    if(!trip.offer || !trip.user || !trip.trip) {
      message.code = 421;
      message.message = "Kindly fill all required fields";
      return message;
    }

    message = await userService.getUserById(trip.user);
    if(!message.returnObject){
      message.code = 500;
      message.message = "Error during second step creation";
      return message;
    }
    return await assurancePersistence.addNewTripRequest(trip);
  }

  async setupThirdStep(data : Required<{file : any , data : any}>) {
    console.log(data);
    let message = new ReturnMessage();
    if (!data.file) {
      message.code    = 421;
      message.message = "Please upload a file ";
      return message;
    }
    return await assurancePersistence.addTripFile({...data.data,file : data.file?.filename})
  
  }
}