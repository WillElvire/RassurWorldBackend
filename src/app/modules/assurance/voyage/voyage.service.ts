
import { OK } from 'http-status-codes';
import { AssurancePersistence } from './../assurance.persitence';
import { UserService } from '../../user/user.service';
import { ReturnMessage } from './../../../common/classes/message';
import {  fullTripDetail } from './dto/field.dto';
import { userVoyageFirstStepDto } from './dto/user.dto';
import { AuditService } from '../../audit/audit.service';
import { AuditAction } from '../../audit/dto/audit.dto';

const userService =  new UserService();
const assurancePersistence = new AssurancePersistence();
const auditService = new AuditService;
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


  async fetchInsurranceByParrainId(parrainId : string){
    let message = new ReturnMessage();
    if(!parrainId){
      message.code   = 421;
      message.message = "Kindly fill all required fields";
      return message;
    }
    return await assurancePersistence.fetchInsurranceByParrainId(parrainId);
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

    if(!!trip.parrainCode) {
      message = await userService.fetchUserByCode(trip.parrainCode);
      if(message.code != OK)  return message;
      message =  await assurancePersistence.addNewTripRequest(trip);
      auditService.addAudit({
        user : trip.user, 
        source : "Assurance Voyage",
        action : AuditAction.DEMANDE,
        old_value : "",
        new_value : JSON.stringify(message.returnObject)
      });
      return message;
    }
    
    message =  await assurancePersistence.addNewTripRequest(trip);
    auditService.addAudit({
      user : trip.user, 
      source : "Assurance Voyage",
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


  async confirmInsurance(insuranceId : string) {
    let message = new ReturnMessage();
    if(!insuranceId){
      message.code    = 421;
      message.message = "Fill all requested fields";
      return message;
    }
    return await assurancePersistence.markInsuranceAsConfirmed(insuranceId);
  }

  async payInsurance(insuranceId : string) {
    return await assurancePersistence.markInsuranceAsPayed (insuranceId);
  }
}