import { ReturnMessage } from './../../../../../jobs/relationship/src/domain/modules/mail/dto/message';
import { AuditAction } from '../audit/dto/audit.dto';
import { AuditService } from './../audit/audit.service';
import { WalletDto } from './dto/wallet.dto';
import { WalletPersistence } from './wallet.persistence';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
const walletPersistence = new WalletPersistence;
const  auditService     = new AuditService;
const userService       = new UserService;
const mailService       = new MailService;
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


    async creditAccount(amount : string , userId : string) {
      let message = new ReturnMessage();
      message = await userService.getUserById(userId);
      let user = message.returnObject;
      let balance = Number(user?.wallet?.balance) + Number(amount);
      mailService.sendCreditMessage({
        amount : amount,
        newBalance : balance.toString(),
        firstname : user?.firstname,
        lastname : user?.lastname,
        email : user?.email,
        phone : user?.phone,
        useWhatsapp : user?.useWhatsapp
      });
      auditService.addAudit({
        userId : user?.id , 
        source : "Wallet Credit",
        action : AuditAction.DEPOSIT,
        old_value : user?.wallet?.balance,
        new_value : balance.toString() 
      });
      return await walletPersistence.credit(balance,user?.wallet?.id);
    }


    async debitAccount(amount : string,userId : string) {
      let message = new ReturnMessage();
      message = await userService.getUserById(userId);
      let user = message.returnObject;
      let balance = Number(user?.wallet?.balance) - Number(amount);
      mailService.sendDebitMessage({
        amount : amount,
        newBalance : balance.toString(),
        firstname : user?.firstname,
        lastname : user?.lastname,
        email : user?.email,
        phone : user?.phone,
        useWhatsapp : user?.useWhatsapp
      });
      auditService.addAudit({
        userId : user?.id , 
        source : "Wallet Debit",
        action : AuditAction.WITHDRAWALL,
        old_value : user?.wallet?.balance,
        new_value : balance.toString() 
      });
      return await walletPersistence.debit(balance,user?.wallet?.id);
    }
}