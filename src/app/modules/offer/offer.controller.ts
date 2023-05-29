import { OfferService } from "./offer.service";
import { logger } from "../../utils/logger";
const offerService = new OfferService();

export class OfferController {
    
    async addOffer(req , res) {
       logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
       logger.info(req.body);
       const result = await offerService.addOffer(req.body);
       logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
       logger.info(result);
       res.status(result.code).send(result);
    }

    async getOfferById(req , res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await offerService.getOfferById(req.params.id);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }

    async getOfferByQuery(req , res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await offerService.getOfferByParamsLike(req.params.query);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }


    async getOffers(req , res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await offerService.getOffers();
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }


}