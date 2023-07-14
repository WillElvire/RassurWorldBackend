import { logger } from "../../utils/logger";
import { MailService } from "../mail/mail.service";
import { ReceiptDto } from "./dto/receipt.dto";
import { ReceiptService } from "./receipt.service";

/******************************************* */
const receiptService  = new ReceiptService();
/******************************************* */

export class ReceiptController {
    
    async addRole(req : any , res : any) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const role = req.body as ReceiptDto;
        const result = await receiptService.save(role);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
      }
  
      findOne(req :  any , res : any) {
  
      }
  
      async find(req :  any , res : any) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await receiptService.findAll();
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
      }
  
}