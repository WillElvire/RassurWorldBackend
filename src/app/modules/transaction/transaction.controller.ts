import { logger } from "../../utils/logger";
import { TransactionService } from "./transaction.service";

const transactionService = new TransactionService();

export class TransactionController {

    async update(req : any , res : any) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await transactionService.update(req.body);
        logger.info(result);
        res.status(result.code).send(result);
    }
}