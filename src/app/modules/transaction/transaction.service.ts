import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import { ReturnMessage } from './../../common/classes/message';
import { TransactionDto, transactionStatus } from './dto/transaction.dto';
import { TransactionPersistence } from "./transaction.persistence";

export class TransactionService {
    private transactionPeristence = new TransactionPersistence;
    private walletService         = new WalletService();
    private userService           = new UserService();

    async save(transaction : TransactionDto) {
        transaction.status = transactionStatus.INITIALISATION;
        return await this.transactionPeristence.save(transaction);
    }

    async findById(id : string) {

        let message = new ReturnMessage();

        if(!message) {
            message.code = 421;
            message.message = "L'id est requis";
            return message;
        }

        return await this.transactionPeristence.findById(id);
    }

    async find() {
        return await this.transactionPeristence.find();
    }

    async update(transaction :TransactionDto ) {
        let message =  await this.transactionPeristence.update(transaction);
        if(!!transaction.primeApporteur) {
          let message = await this.userService.getUserByParrainCode(transaction.code);
          message = await this.walletService.creditAccount(transaction.primeApporteur.toString() , message?.returnObject?.id);
          return message;
        }
        return message;
    }

}