import { TransactionRepository } from './../../repository/Transaction.repository';
import { ReturnMessage } from './../../common/classes/message';
import { TransactionDto } from "./dto/transaction.dto";
import { OK } from 'http-status-codes';

export class TransactionPersistence  {

    private _rTransactionRepository = TransactionRepository;

    async save(transaction : any) {

        let message = new ReturnMessage();

        try { 
            const newTransaction = this._rTransactionRepository.create(transaction); 
            const result         = await this._rTransactionRepository.save(newTransaction);
            message.code         = OK;
            message.returnObject = result;
            message.message      = "Transaction successfully added !";
        }
        catch(Exception) {
           message.code    = 500;
           message.message = Exception.message;
        }

        return message;

    } 


    async update(transactionDto : TransactionDto) {
        let message = new ReturnMessage();
        try {

            delete transactionDto?.code 
            const newTransaction  = await this._rTransactionRepository.createQueryBuilder().update().set(transactionDto as any).where("id = :id",{id : transactionDto.id}).execute();
            message.returnObject = newTransaction;
            message.code = OK;
            message.message = "Transaction successfully added !";


        }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
        }

        return message;
    }

    async find() {
        let message = new ReturnMessage();
        try {
            const result = await this._rTransactionRepository.find();
            message.code = OK;
            message.returnObject = result;
        }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
        }
        return message;
    }

    async  findById(id : string) {
        let message = new ReturnMessage();
        try {

            const result = await this._rTransactionRepository.findBy({id});
            message.code = OK;
            message.returnObject = result;

        }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
        }
        return message;
    }


    async  findByTransId(id : string) {
        let message = new ReturnMessage();
        try {

            const result = await this._rTransactionRepository.findOneBy({transactionNumb : id});
            message.code = OK;
            message.returnObject = result;

        }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
        }
        return message;
    }

}