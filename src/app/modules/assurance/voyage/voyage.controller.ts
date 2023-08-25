import { defaultWhatsappMessage, relationShipMailler } from "../../../__moock__/message";
import { WhatsappService } from "../../../services/mailing/message.service";
import { logger } from "../../../utils/logger";
import { MailService } from "../../mail/mail.service";
import { VoyageService } from "./voyage.service";
const voyageService  = new VoyageService();
const mailService    = new MailService();
export class VoyageController {
      
  

  async firstStep(req,res) {
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await voyageService.setupFirstStep(req.body);
    //const mail   = await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone});
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    //logger.info("Envoi de mail  ====>",mail);
    res.status(result.code).send(result);
  }

  async secondStep(req,res){
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await voyageService.setupSecondStep(req.body);
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    res.status(result.code).send(result);
  }
  
  async thirdStep(req,res){
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await voyageService.setupThirdStep({file : req.file , data : req.body});
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    res.status(result.code).send(result);
  } 
}