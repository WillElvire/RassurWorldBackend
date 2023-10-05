import { DatabaseSourceManager } from "../../common/classes/init";
import { ReturnMessage } from "../../common/classes/message";
import { BeneficiaryRepository } from "../../repository/Beneficiary.repository";
import { BeneficiaryDto } from "../assurance/individuel/dto/field.dto";

const beneficiaryRepository = BeneficiaryRepository;

export class BeneficiaryPersistence {

    async addBeneficiary(newBenef : BeneficiaryDto)  {
        const queryRunner = DatabaseSourceManager.getInstance().source().createQueryRunner();
        let message       = new ReturnMessage();
        try 
        {
            await queryRunner.startTransaction() 
            const newBeneficiary  = beneficiaryRepository.create(newBenef as any);
            const beneficiary     = await  queryRunner.manager.save(newBeneficiary);
            message.code          = 200;
            message.returnObject  =  beneficiary;
            message.message = "Beneficiary saved";
            await queryRunner.commitTransaction();
        }
        catch(Exception) {
            await queryRunner.rollbackTransaction();
            message.message = Exception.message;
            message.code    = 500;
        }
        return message;
    }


    async getBeneficiaryFromUserId(userId : any) {
        let message = new ReturnMessage();
        try 
        {
            const beneficiary = await beneficiaryRepository.find({
                where: { user :  userId },
            });
            message.code          = 200;
            message.returnObject  =  beneficiary;
        }catch(Exception)
        {
            message.message = Exception.message;
            message.code    = 500;
        }

        return message;
    }


    async getBeneficiaryFromInsuranceId(insuranceId : any) {
        let message = new ReturnMessage();
        console.log(insuranceId)
        try 
        {
            const beneficiary = await beneficiaryRepository.findBy({assuranceId : insuranceId});
            message.code          = 200;
            message.returnObject  =  beneficiary;
        }catch(Exception)
        {
            message.message = Exception.message;
            message.code    = 500;
        }

        return message;
    }

    async getBeneficiaryUsingInsuranceIdAndUserId(insurId : any , userId : any ) {
        let message = new ReturnMessage();
        try 
        {
            const beneficiary = await beneficiaryRepository.find({
                where: { user : userId , assuranceId : insurId },
            });
            message.code          = 200;
            message.returnObject  =  beneficiary;
        }catch(Exception)
        {
            message.message = Exception.message;
            message.code    = 500;
        }

        return message;
      
    }
}