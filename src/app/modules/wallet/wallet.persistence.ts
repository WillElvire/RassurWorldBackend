import { OK } from 'http-status-codes';

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

    async credit(amount : number , id : string) {
      let message = new ReturnMessage();
      try {
        const result = walletRepository.createQueryBuilder().update({balance : amount}).where("id = :balanceId",{balanceId:id}).execute();
        message.code = OK;
        message.returnObject = result;
      }
      catch(Exception) {
        message.message = Exception.Message;
        message.code    = 500;
      }
      return message;
    }

    async debit(newBalance : number , id : string) {
      let message = new ReturnMessage();
      try {
        const result = walletRepository.createQueryBuilder().update({balance : newBalance}).where("id = :balanceId",{balanceId:id}).execute();
        message.code = OK;
        message.returnObject = result;
      }
      catch(Exception) {
        message.message = Exception.Message;
        message.code    = 500;
      }
      return message;
    }
}