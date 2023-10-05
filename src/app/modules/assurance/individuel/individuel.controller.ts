import { IndividuelService } from './individuel.service';
import { logger } from "../../../utils/logger";
import { LogAppender } from '../../../common/classes/appender';

const individuelService =  new IndividuelService();

export class IndividuelController {

    async setupUser(req : any , res : any ) {
       
        const result =  await individuelService.setupFirstStep({...req.body});
        LogAppender.writeLogFromBody(req,result,"IndividuelController");
        res.status(result.code).send(result);
    }

    async setupSecondStep(req : any , res : any ) {
        const result =  await individuelService.setupSecondStep({...req.body});
        LogAppender.writeLogFromBody(req,result,"IndividuelController");
        res.status(result.code).send(result);
    }


    async setupThirdStep(req : any , res : any ) {
       
        const result =  await individuelService.setupThirdStep({...req.body});
        LogAppender.writeLogFromBody(req,result,"IndividuelController");
        res.status(result.code).send(result);
    }
  
}