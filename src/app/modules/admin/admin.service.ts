import { ReturnMessage } from './../../common/classes/message';
import { AssurancePersistence } from './../assurance/assurance.persitence';
export class AdminService{

    private assurancePersistence = new AssurancePersistence;

    async fetchAllInsuranceByStatus(active : string ,payed : string ,limit : number = 2){

        let message = new ReturnMessage();
        const keywordArray = ["active","inactive","payed","unpaid"];

        if(keywordArray.includes(active?.toLowerCase()) && keywordArray.includes(payed?.toLowerCase())) {
          const result  = await this.assurancePersistence.getAllInsuranceRequestByStatus(
          this.insuranceStatusConvertion(payed),
          this.insuranceStatusConvertion(active),
          limit
          );
          return result;
        }

        message = await this.assurancePersistence.findAll();
        return message;
    }

    async getAppStatistics(){
      return await this.assurancePersistence.statistics();
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