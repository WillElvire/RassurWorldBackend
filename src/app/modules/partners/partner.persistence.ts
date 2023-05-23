import { ReturnMessage } from './../../common/classes/message';
import { PartnersRepository } from "../../repository/Partners.repository";
import { OK } from 'http-status-codes';

const partnersRepository = PartnersRepository;

export class PartnerPersistence {

    async addPartner(partner) {

       let message = new ReturnMessage();
       const existPartner = await partnersRepository.findOneBy({phone : partner.phone});

       if(!existPartner) {
        try {
            const newPartner = partnersRepository.create(partner as any);
            const result     = await partnersRepository.save(newPartner);
            message.code = OK;
            message.message = "Partner created successfully !";
            message.returnObject = result;
        }catch(Exception){
            message.message = Exception.message;
            message.code = 500;
        }
        return message;
       }
       
       message.message = "Partner with this phone number already Exists";
       message.code = 500.
       return message;
      
       
    }

    async getPartners() {
        let message = new ReturnMessage();
        try {
            const result = await partnersRepository.find();
            message.code = OK;
            message.returnObject = result;
  
         }catch(Exception) {
            message.code = 500;
            message.message = Exception.message;
         }
  
         return message; 
    }

}