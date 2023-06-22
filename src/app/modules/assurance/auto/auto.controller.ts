import { defaultWhatsappMessage, relationShipMailler } from "../../../__moock__/message";
import { WhatsappService } from "../../../services/mailing/message.service";
import { logger } from "../../../utils/logger";
import { AutoService } from "./auto.service";

const autoService = new AutoService();
export class AutoController {
    
  async firstStep(req , res ) {
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await autoService.setupFirstStep(req.body);
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(result);
    new WhatsappService()
    .setBody(relationShipMailler(result.returnObject.firstName,result.returnObject.lastName))
    .setReceiver(result.returnObject.phone)
    .send();
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

  

}