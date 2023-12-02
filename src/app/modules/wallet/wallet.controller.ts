import { LogAppender } from "../../common/classes/appender";
import { WalletService } from "./wallet.service";
const walletService = new WalletService();
export class WalletController {
    
    async getwalletById(req:any ,res : any) {
        const result = await walletService.getWalletById(req.params.walletId);
        LogAppender.writeLogFromBody(req,result,"UserController");
        res.status(result.code).send(result);
    }
}