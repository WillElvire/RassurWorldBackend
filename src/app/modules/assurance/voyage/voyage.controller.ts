import { logger } from "../../../utils/logger";
import { VoyageService } from "./voyage.service";
const voyageService  = new VoyageService();
export class VoyageController {
      
  

  async firstStep(req,res) {
    logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    logger.info(req.body);
    const result = await voyageService.setupFirstStep(req.body);
    logger.info(result);
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