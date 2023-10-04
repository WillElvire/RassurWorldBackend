import { LogAppender } from "../../../common/classes/appender";
import { logger } from "../../../utils/logger";
import { MailController } from "../../mail/mail.controller";
import { MailService } from "../../mail/mail.service";
import { AutoService } from "./auto.service";

const autoService    = new AutoService();
const mailService    = new MailService();

export class AutoController {
    
  async firstStep(req , res ) {
   
    const result = await autoService.setupFirstStep(req.body);
    //const mail   = await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone , useWhatsapp : result.returnObject?.useWhatsapp , email : result.returnObject?.email});
    LogAppender.writeLogFromBody(req,result,"AutoController");
    //logger.info("Envoi de mail  ====>",mail);
    res.status(result.code).send(result);
  }

  async secondStep(req,res){
   
    const result = await autoService.setupSecondStep(req.body);
    LogAppender.writeLogFromBody(req,result,"AutoController");
    res.status(result.code).send(result);
  }

  async thirdStep(req,res){
   
    const result = await autoService.setupThirdStep({file : req.file , data : req.body});
    LogAppender.writeLogFromBody(req,result,"AutoController");
    res.status(result.code).send(result);
  }


  async getInsurrance(req,res) {
    
    const result = await autoService.getInsurrance(req.params.id);
    LogAppender.writeLogFromBody(req,result,"AutoController");
    res.status(result.code).send(result);

  }


  async valideCotation(req,res) {
    const result = await autoService.validateCotation(req.params.id);
    LogAppender.writeLogFromBody(req,result,"AutoController");
    res.status(result.code).send(result);

  }

  

}