
import { ReturnMessage } from "../../common/classes/message";
import { WalletRepository } from "../../repository/Wallet.repository";
import { WalletDto } from './dto/wallet.dto';

const walletRepository = WalletRepository;

export class WalletPersistence {

    async addWallet(wallet : WalletDto) {
      console.log(wallet);
      let message= new ReturnMessage();
      try {
        const newWallet   = walletRepository.create({...wallet} as any);
        const result    = await walletRepository.save(newWallet);
        message.code    = 200;
        message.returnObject = result;
      }catch(Exception) {
        message.message = Exception.Message;
        message.code    = 500;

      }
      return message;
    }

    async deposit(amount : number , userId : string) {
        
    }

    async withdrawall(userId) {
        
    }
}