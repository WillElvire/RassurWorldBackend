import { ReturnMessage } from './../../common/classes/message';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionPersistence } from "./transaction.persistence";

export class TransactionService {
    private transactionPeristence = new TransactionPersistence;

    async save(transaction : TransactionDto) {
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

    async update(transaction :TransactionDto) {
        return await this.transactionPeristence.update(transaction);
    }

}