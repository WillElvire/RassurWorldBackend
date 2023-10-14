import { IndividuelService } from './individuel.service';
import { logger } from "../../../utils/logger";
import { LogAppender } from '../../../common/classes/appender';
import { MailService } from '../../mail/mail.service';

const individuelService =  new IndividuelService();
const mailService = new MailService();

export class IndividuelController {

    async setupUser(req : any , res : any ) {
       
        const result =  await individuelService.setupFirstStep({...req.body});
        const mail   = await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone , useWhatsapp : result.returnObject?.useWhatsapp , email : result.returnObject?.email});
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