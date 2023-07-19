import { ReturnMessage } from "../../../common/classes/message";
import { UserService } from "../../user/user.service";
import { AssurancePersistence } from "../assurance.persitence";

const userService = new UserService();
const assurancePersistence = new AssurancePersistence();

export class AutoService {
  async setupFirstStep(user) {
    let message = new ReturnMessage();
    if (!user.email || !user.firstname || !user.lastname || !user.phone) {
      message.code = 421;
      message.message = "Kindly fill all required fields";
      return message;
    }
    return await userService.addPartialUser(user, "auto");
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

  async getInsurrance(assurId) {
    let message =  new ReturnMessage();
    if(!assurId){
      message.code    = 421;
      message.message = "Kindly fill requested fields";
      return message;
    }
    return await assurancePersistence.getInsurrance(assurId);
  }


  async validateCotation(assurId) {
    let message =  new ReturnMessage();
    if(!assurId){
      message.code    = 421;
      message.message = "Kindly fill requested fields";
      return message;
    }
    return await assurancePersistence.activeCotation(assurId);
  }
}
