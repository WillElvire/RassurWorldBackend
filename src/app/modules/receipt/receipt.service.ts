import { ReceiptDto } from "./dto/receipt.dto";
import { ReceiptPersistence } from "./receipt.persitence";


export class ReceiptService {
    private receiptPersistence  =  new ReceiptPersistence();
   
    async save(role : ReceiptDto)  {
       return this.receiptPersistence.save(role);
    }

    findAll(){
        return this.receiptPersistence.find();
    }
    
    findRoleById() {

    }

    findReceiptById(id) {
        return this.receiptPersistence.getReceiptByid(id);
    }

    findRoleByFlag() {

    }
}