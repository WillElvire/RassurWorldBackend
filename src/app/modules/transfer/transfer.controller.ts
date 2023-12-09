import { LogAppender } from "../../common/classes/appender";
import { MailService } from "../mail/mail.service";
import { TransactionService } from "../transaction/transaction.service";
import { TransferService } from "./transfer.service";

const transferService = new TransferService();
const transactionService = new TransactionService();

/**************************************************************** */
/*   service qui s'occupe de faire des appels api de transactions */
/******************************************************* *********/

export class TransferController {
    
    /**
     * @description : cette fonction permet de faire un transfert d'argent vers un numero de telephone
     * @param req 
     * @param res 
     */
    async momoTransfer(req : any , res : any) {
        //transferId : this.insurance.transaction.id , insurranceId : this.insuranceId }
        const result = await transferService.mobileMoneyPayment(req.body);
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }


    /**
     * @description : cette fonction permet de recupérer le status d'un transfert d'argent vers un numero de telephone
     * @param req 
     * @param res 
     */

    async momoTransDetail(req : any , res : any) {
        const result = await transferService.mobileMoneyStatus(req.body.orderId,'moov');
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    /**
     * @description : cette fonction permet de recupérer un transaction en fonction de son status
     * @param req 
     * @param res 
     */

    async momoTransDetailByTransId(req : any , res : any) {
        const result = await transferService.mobileMoneyStatus(req.params.idTransfer,'moov');
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    /**
     * @description 
     * @param req 
     * @param res 
     */
    async getTransfer(req : any , res : any){
        const result = await transferService.getTransfer();
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }
}