import { BeneficiaryService } from './../../beneficiary/beneficiary.service';
import { OK } from 'http-status-codes';
import { ReturnMessage } from "../../../common/classes/message";
import { UserService } from "../../user/user.service";
import { AssurancePersistence } from "../assurance.persitence";
import { AuditService } from '../../audit/audit.service';
import { AuditAction } from '../../audit/dto/audit.dto';

const userService = new UserService();
const assurancePersistence = new AssurancePersistence();
const auditService = new  AuditService;
const beneficiaryService = new BeneficiaryService;
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

    if(!!trip.parrainCode) {
      message = await userService.fetchUserByCode(trip.parrainCode);
      if(message.code != OK)  return message;
     
      message =  await assurancePersistence.addNewTripRequest(trip);
      auditService.addAudit({
        userId : trip.user, 
        source : "Assurance auto",
        action : AuditAction.DEMANDE,
        old_value : "",
        new_value : JSON.stringify(message.returnObject)
      });
      return message;
    }
   
    message =  await assurancePersistence.addNewTripRequest(trip);
    auditService.addAudit({
      userId : trip.user, 
      source : "Individuel accident",
      action : AuditAction.DEMANDE,
      old_value : "",
      new_value : JSON.stringify(message.returnObject)
    });
    return message;
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
    message =  await assurancePersistence.getInsurrance(assurId);
    if(message.code == OK) {
      message.returnObject = {
        ...message.returnObject,
        beneficiary : (await beneficiaryService.getBeneficiary(assurId)).returnObject
      }
      console.log(message.returnObject.beneficiary)
      return message;
    }
    return message;
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
