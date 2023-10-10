import { LogAppender } from "../../common/classes/appender";
import { TransactionService } from "./transaction.service";

const transactionService = new TransactionService();

export class TransactionController {

    async update(req : any , res : any) {
        const result = await transactionService.update(req.body);
        LogAppender.writeLogFromBody(req,result,"TransactionController");
        res.status(result.code).send(result);
    }
}