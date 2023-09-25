import { IndividuelService } from './individuel.service';
import { logger } from "../../../utils/logger";

const individuelService =  new IndividuelService();

export class IndividuelController {

    async setupUser(req : any , res : any ) {
        logger.info("setupUser : ",req.body)
        const result =  await individuelService.setupFirstStep({...req.body});
        logger.info("setupUser response : " ,result)
        res.status(result.code).send(result);
    }

    async setupSecondStep(req : any , res : any ) {
        logger.info("setupSecondStep : ",req.body)
        const result =  await individuelService.setupSecondStep({...req.body});
        logger.info("setupSecondStep response : " ,result)
        res.status(result.code).send(result);
    }


    async setupThirdStep(req : any , res : any ) {
        logger.info("setupThirdStep : ",req.body)
        const result =  await individuelService.setupThirdStep({...req.body});
        logger.info("setupThirdStep response : " ,result)
        res.status(result.code).send(result);
    }
  
}