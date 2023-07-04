import { ReturnMessage } from './../../common/classes/message';
import { OfferRepository } from "../../repository/Offre.repository";
import { OfferDto } from "./dto/offer.dto";

const offerRepository = OfferRepository;

export class OfferPersistence {

    async addOffer(offer : OfferDto) {

      let message = new ReturnMessage();

      try{

        offer.isActive = true;
        const newOffer = offerRepository.create({...offer} as any);
        const result   = await offerRepository.save(newOffer);

        message.code         = 200;
        message.returnObject = result;
        message.message      = "Offre  ajoutée avec succes";
       
      }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
      }
      return message;
    }

    async isExistOffer(query : string ){

        let message = new ReturnMessage();

        try{

            const result         = await offerRepository.createQueryBuilder().where("libelle =:query OR description= :query OR id = :query",{query}).getExists();
            message.code         = 200;
            message.returnObject = result;

        }catch(Exception) {
            message.code    = 500;
            message.message = Exception.message;
        }
        return message;
    }

    async getOfferById(id : string) {
        let message = new ReturnMessage();

        try{
            const result = await offerRepository.findBy({id})
            message.code = 200;
            message.returnObject = result;
        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }

    async  getOfferByParamsLike(query : string){
        let message = new ReturnMessage();

        try{
            const result = await offerRepository.createQueryBuilder().where(`libelle LIKE '%${query}%' OR description LIKE '%${query}%' OR id LIKE '%${query}%'`).getMany();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }

    async getOffers() {
        let message = new ReturnMessage();

        try{
            const result = await offerRepository.find();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }


    async delete(id : string) {
        let message = new ReturnMessage();

        try{
            const result = await offerRepository.delete({id});
            message.code = 200;
            message.message = "Offre supprimé avec succes";

        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }
}