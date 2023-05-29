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

  secondStep(req,res){

  }

  thirdStep(req,res){
    
  }

}