import { LogAppender } from "../../common/classes/appender";
import { TransferService } from "./transfer.service";

const transferService = new TransferService();

export class TransferController {
    
    async momoTransfer(req : any , res : any) {
        const result = await transferService.mobileMoneyPayment(req.body,'orange');
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    async momoTransDetail(req : any , res : any) {
        const result = await transferService.mobileMoneyStatus(req.body.orderId,'orange');
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }

    async getTransfer(req : any , res : any){
        const result = await transferService.getTransfer();
        LogAppender.writeLogFromBody(req,result,"TransferController");
        res.status(result.code).send(result);
    }
}