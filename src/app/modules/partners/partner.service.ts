import { ReturnMessage } from "../../common/classes/message";
import { PartnerDto } from "./dto/partner.dto";
import { PartnerPersistence } from "./partner.persistence";

/******************************************* */
const partnerPersistence  = new PartnerPersistence();
/******************************************* */

export class PartnerService {

    async addPartner(partner : PartnerDto) {

      
      let message = new ReturnMessage();

      if(!partner?.description || !partner?.fullName || !partner?.phone ){
        message.message = "Kindly fill all requested fields";
        message.code = 400;
        return message;
      }

      message = await partnerPersistence.addPartner(partner);
      return message;

    }

    async getPartners() {
        let message = new ReturnMessage();
        message = await partnerPersistence.getPartners();
        return message;
    }
}