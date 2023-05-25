import { logger } from "../../utils/logger";
import { PartnerService } from "./partner.service";

/******************************************* */
const partnerService  = new PartnerService();
/******************************************* */


export class PartnerController {

    async addPartner(req ,res) {
      logger.info("add partner request : " , req.body);
      const result = await partnerService.addPartner(req.body);
      logger.info("add partner resp : " , result);
      res.status(result.code).send(result);
    }

    async getPartners(req , res) {
        logger.info("get partner request : " , req._server);
        const result = await partnerService.getPartners();
        logger.info("add partner response : " , result);
        res.status(result.code).send(result);
    }

    async addRate(req , res) {
        logger.info("add rate request : " , req.body);
        const result = await partnerService.addRate(req.body);
        logger.info("add rate response : " , result);
        res.status(result?.code).send(result);
    }

    async getPartnerByFullName(req , res){
        logger.info("get partner by name response : " , req.body);
        const result = await partnerService.getPartnerByFullName(req.body.fullName);
        logger.info("get partner by name result : " , result);
        res.status(result.code).send(result);
    }

    async getPartnerById(req , res) {
        logger.info("get partner by id request : " , req.params);
        const result = await partnerService.getPartnerById(req.params.id);
        logger.info("get partner by id response : " , result);
        res.status(result.code).send(result);
    }
}