import { ReturnMessage } from './../../common/classes/message';
import { BeneficiaryDto } from "../assurance/individuel/dto/field.dto";
import { BeneficiaryPersistence } from "./beneficary.persistence";
import { logger } from '../../utils/logger';

const beneficiaryPersistence = new BeneficiaryPersistence();
export class BeneficiaryService {

    async addBeneficiary(beneficiaries : BeneficiaryDto[]) {
        let message = new ReturnMessage();
       
        for (const beneficiary of beneficiaries) {
            message = await beneficiaryPersistence.addBeneficiary(beneficiary);
            logger.debug(message)
            if(message.code == 200) {
                continue;
            }
            else{
                logger.info("Beneficiaire : " + beneficiary.firstname +''+ beneficiary.lastname+ " n'est pas enregistré");
                logger.info(beneficiary);
                continue;
            }
        }
        message.code = 200;
        message.message = "Beneficiary successfully added";
        return message
    }
}