import { ReturnMessage } from './../../../../../jobs/relationship/src/domain/modules/mail/dto/message';
import { AuditAction } from '../audit/dto/audit.dto';
import { AuditService } from './../audit/audit.service';
import { WalletDto } from './dto/wallet.dto';
import { WalletPersistence } from './wallet.persistence';
const walletPersistence = new WalletPersistence;
const  auditService = new AuditService;
export class WalletService {

    async addWallet(wallet : WalletDto) {
        let returnMessage = new ReturnMessage();
        returnMessage =  await walletPersistence.addWallet(wallet);
        auditService.addAudit({
            userId : "" , 
            source : "Creation de wallet",
            action : AuditAction.CREATION_WALLET,
            old_value : "",
            new_value : JSON.stringify(returnMessage.returnObject)
        });
        return returnMessage;
    }
}