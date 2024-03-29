import { BeneficiaryService } from './../../beneficiary/beneficiary.service';
import { OK } from 'http-status-codes';
import { ReturnMessage } from "../../../common/classes/message";
import { UserService } from "../../user/user.service";
import { AssurancePersistence } from "../assurance.persitence";
import { BeneficiaryDto } from './dto/field.dto';
import { AuditService } from '../../audit/audit.service';
import { AuditAction } from '../../audit/dto/audit.dto';

const userService = new UserService();
const assurancePersistence = new AssurancePersistence();
const beneficiaryService = new BeneficiaryService();
const auditService = new AuditService;

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


    async setupThirdStep(data:any) {
        const beneficaries : BeneficiaryDto[]    = data?.beneficaries;
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
         
          message = await assurancePersistence.addNewTripRequest(trip);
          auditService.addAudit({
            userId : trip.user, 
            source : "Individuel accident",
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

}