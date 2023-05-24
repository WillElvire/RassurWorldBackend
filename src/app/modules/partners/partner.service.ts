import { ReturnMessage } from "../../common/classes/message";
import { isEmptyField } from "../../common/plugins/data/data";
import { PartnerDto, PartnerRateDto } from "./dto/partner.dto";
import { PartnerPersistence } from "./partner.persistence";

/******************************************* */
const partnerPersistence  = new PartnerPersistence();
/******************************************* */

export class PartnerService {

    async addPartner(partner : PartnerDto) {

      let message = new ReturnMessage();

      if(!partner?.description || !partner?.fullName || !partner?.phone ){
        message.message = "Kindly fill all requested fields";
        message.code = 421;
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

    async addRate(partnerRateDto : PartnerRateDto) {

       let message = new ReturnMessage();

       if(!partnerRateDto?.day || !partnerRateDto.partners || !partnerRateDto.price) {
        message.message = "Kindly fill all requested fields";
        message.code = 421;
        return message;
       }

       message = await partnerPersistence.addRate(partnerRateDto);
       return message;
    }


    async getPartnerById(idPartner : string) {
        let message = new ReturnMessage();
        message = await partnerPersistence.getPartnerById(idPartner);
        return message;
    }
}