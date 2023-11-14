import { ReturnMessage } from './../../common/classes/message';
import { OfferDto } from "./dto/offer.dto";
import { OfferPersistence } from './offer.persistence';

const offerPersistence = new OfferPersistence();

export class OfferService {

    async addOffer(offer : OfferDto) {

      let message = new ReturnMessage();

      if(!offer.description || !offer.libelle) {
        message.code = 421;
        message.message = "Veuillez renseigner les champs";
        return message;
      }

      message = await this.isExistOffer(offer.libelle);

      if(message.returnObject){
        message.code = 500;
        message.message = "Offre deja existante";
        return message;
      }

      return await offerPersistence.addOffer(offer);
    }

    async isExistOffer(query : string ){
      return await offerPersistence.isExistOffer(query);
    }

    async getOfferById(id : string) {
      return await offerPersistence.getOfferById(id);
    }
    
    async deleteOffer(id : string) {
      return await offerPersistence.delete(id);
    }

    async  getOfferByParamsLike(query : string){
        return await offerPersistence.getOfferByParamsLike(query);
    }

    async  getOffers(){
        return await offerPersistence.getOffers();
    }
}