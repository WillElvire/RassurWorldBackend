import { ReturnMessage } from './../../common/classes/message';
import { AssurancePersistence } from './../assurance/assurance.persitence';
export class AdminService{

    private assurancePersistence = new AssurancePersistence;

    async fetchAllInsuranceByStatus(active : string = "active",payed : string = "unpaid"){

        let message = new ReturnMessage();
        const keywordArray = ["active","inactive","payed","unpaid"];

        if(keywordArray.includes(active.toLowerCase()) && keywordArray.includes(payed.toLowerCase())) {
          const result  = await this.assurancePersistence.getAllInsuranceRequestByStatus(
          this.insuranceStatusConvertion(payed),
          this.insuranceStatusConvertion(active)
          );
          return result;
        }

        message.code = 421;
        message.message = "Kindly fill all required fields";
        return message;
    }


    private insuranceStatusConvertion(status : string) {
        switch(status){
          case "active" : 
            return true;
          case "inactive":
            return false;
          case "payed" :
            return true;
          case "notPayed" :
            return false;
        } 
      }
    
}