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