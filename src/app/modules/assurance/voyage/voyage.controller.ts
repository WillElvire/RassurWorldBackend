import { LogAppender } from "../../../common/classes/appender";
import { logger } from "../../../utils/logger";
import { MailService } from "../../mail/mail.service";
import { VoyageService } from "./voyage.service";

const voyageService  = new VoyageService();
const mailService    = new MailService();


export class VoyageController {
      
  async firstStep(req,res) {
    
    const result = await voyageService.setupFirstStep(req.body);
    const mail   = await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone});
    LogAppender.writeLogFromBody(req,result,"VoyageController");
    //logger.info("Envoi de mail  ====>",mail);
    res.status(result.code).send(result);
  }

  async secondStep(req,res){
    
    const result = await voyageService.setupSecondStep(req.body);
    LogAppender.writeLogFromBody(req,result,"VoyageController");
    res.status(result.code).send(result);
  }
  
  async thirdStep(req,res){
   
    const result = await voyageService.setupThirdStep({file : req.file , data : req.body});
    LogAppender.writeLogFromBody(req,result,"VoyageController");
    res.status(result.code).send(result);
  }
  
  
  

  async fetchInsurranceByParrainId(req,res){
   
    const result = await voyageService.fetchInsurranceByParrainId(req.body.parrainId);
    LogAppender.writeLogFromBody(req,result,"VoyageController"); 
    res.status(result.code).send(result);
  }

  async confirmInsurance(req,res){
    const result = await voyageService.confirmInsurance(req.body.insuranceId);
    LogAppender.writeLogFromBody(req,result,"VoyageController");
    res.status(result.code).send(result);
  }
}