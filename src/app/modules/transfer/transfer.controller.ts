import { LogAppender } from "../../common/classes/appender";
import { TransactionService } from "../transaction/transaction.service";
import { TransferService } from "./transfer.service";

const transferService = new TransferService();
const transactionService = new TransactionService();

export class TransferController {
    
    async momoTransfer(req : any , res : any) {
        //transferId : this.insurance.transaction.id , insurranceId : this.insuranceId }
        const result = await transferService.mobileMoneyPayment(req.body);
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    async momoTransDetail(req : any , res : any) {
        const result = await transferService.mobileMoneyStatus(req.body.orderId,'moov');
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    async momoTransDetailByTransId(req : any , res : any) {
        const result = await transferService.mobileMoneyStatus(req.params.idTransfer,'moov');
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    async getTransfer(req : any , res : any){
        const result = await transferService.getTransfer();
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }
}