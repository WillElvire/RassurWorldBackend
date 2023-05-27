import { OfferService } from "./offer.service";

const offerService = new OfferService();

export class OfferController {
    
    async addOffer(req , res) {
       const result = await offerService.addOffer(req.body);
       res.status(result.code).send(result);
    }

    async getOfferById(req , res) {
        const result = await offerService.getOfferById(req.params.id);
        res.status(result.code).send(result);
    }

    async getOfferByQuery(req , res) {
        const result = await offerService.getOfferByParamsLike(req.params.query);
        res.status(result.code).send(result);
    }


    async getOffers(req , res) {
        const result = await offerService.getOffers();
        res.status(result.code).send(result);
    }


}