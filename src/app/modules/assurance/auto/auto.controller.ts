import { logger } from "../../../utils/logger";
import { MailService } from "../../mail/mail.service";
import { AutoService } from "./auto.service";

const autoService = new AutoService();
const mailService = new MailService();
export class AutoController {
    
  async firstStep(req , res ) {
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await autoService.setupFirstStep(req.body);
    const mail   = await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone});
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info("Envoi de mail  ====>",mail);
    res.status(result.code).send(result);
  }

  async secondStep(req,res){
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await autoService.setupSecondStep(req.body);
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    res.status(result.code).send(result);
  }

  async thirdStep(req,res){
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await autoService.setupThirdStep({file : req.file , data : req.body});
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    res.status(result.code).send(result);
  }


  async getInsurrance(req,res) {
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.params.id);
    const result = await autoService.getInsurrance(req.params.id);
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    res.status(result.code).send(result);

  }


  async valideCotation(req,res) {
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.params.id);
    const result = await autoService.validateCotation(req.params.id);
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    res.status(result.code).send(result);

  }

  

}