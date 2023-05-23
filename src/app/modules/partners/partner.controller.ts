import { PartnerService } from "./partner.service";

/******************************************* */
const partnerService  = new PartnerService();
/******************************************* */


export class PartnerController {

    async addPartner(req ,res) {
      const result = await partnerService.addPartner(req.body);
      res.status(result.code).send(result);
    }

    async getPartners(req , res) {
        const result = await partnerService.getPartners();
        res.status(result.code).send(result);
    }

    async addRate(req , res) {
        const result = await partnerService.addRate(req.body);
        res.status(result.code).send(result);
    }
}