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
        res.status(result?.code).send(result);
    }

    async getPartnerByFullName(req , res){
        const result = await partnerService.getPartnerByFullName(req.body.fullName);
        res.status(result.code).send(result);
    }

    async getPartnerById(req , res) {
        console.log(req.params)
        const result = await partnerService.getPartnerById(req.params.id);
        res.status(result.code).send(result);
    }
}