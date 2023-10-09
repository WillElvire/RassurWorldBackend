import { LogAppender } from "../../common/classes/appender";
import { ReceiptDto } from "./dto/receipt.dto";
import { ReceiptService } from "./receipt.service";

/******************************************* */
const receiptService = new ReceiptService();
/******************************************* */

export class ReceiptController {
  async addReceipt(req: any, res: any) {
    const role = req.body as ReceiptDto;
    const result = await receiptService.save(role);
    LogAppender.writeLogFromBody(req, result, "ReceiptController");
    res.status(result.code).send(result);
  }

  findOne(req: any, res: any) {}

  async find(req: any, res: any) {
    const result = await receiptService.findAll();
    LogAppender.writeLogFromBody(req, result, "ReceiptController");
    res.status(result.code).send(result);
  }
}
