import { OfferService } from "./offer.service";
import { logger } from "../../utils/logger";
import { LogAppender } from "../../common/classes/appender";
const offerService = new OfferService();

export class OfferController {
    
    async addOffer(req , res) {
       const result = await offerService.addOffer(req.body);
       LogAppender.writeLogFromBody(req,result,"OfferController");
       res.status(result.code).send(result);
    }

    async getOfferById(req , res) {
        const result = await offerService.getOfferById(req.params.id);
        LogAppender.writeLogFromBody(req,result,"OfferController");
        res.status(result.code).send(result);
    }

    async getOfferByQuery(req , res) {
        const result = await offerService.getOfferByParamsLike(req.params.query);
        LogAppender.writeLogFromBody(req,result,"OfferController");
        res.status(result.code).send(result);
    }


    async getOffers(req , res) {
        const result = await offerService.getOffers();
        LogAppender.writeLogFromBody(req,result,"OfferController");
        res.status(result.code).send(result);
    }


    async deleteOffer(req , res) {
        const result = await offerService.deleteOffer(req.params.id);
        LogAppender.writeLogFromBody(req,result,"OfferController");
        res.status(result.code).send(result);
    }


}