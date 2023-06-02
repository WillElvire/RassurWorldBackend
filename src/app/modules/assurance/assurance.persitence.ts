import { DatabaseSourceManager } from './../../common/classes/init';
import { AssuranceRepository } from './../../repository/Assurance.repository';
import { ReturnMessage } from './../../common/classes/message';
import { DetailRepository } from '../../repository/Detail.repository';
import { fullTripDetail } from './voyage/dto/field.dto';


const assuranceRepository = AssuranceRepository;
const detailRepository    = DetailRepository;

export class AssurancePersistence {

  async addNewAutoRequest(autoDetail )  {

  }
  
  async addNewTripRequest(tripDetail : fullTripDetail) {

    const queryRunner = DatabaseSourceManager.getInstance().source().createQueryRunner();
    let message  = new ReturnMessage();

    try {

      await queryRunner.startTransaction() 
      const newDetail  = detailRepository.create(tripDetail.trip as any);
      const detail     = await  queryRunner.manager.save(newDetail);
        
      try {

        const newInsurance = assuranceRepository.create({
          isPayed : false,
          isActive : true,
          user : tripDetail.user,
          offer : tripDetail.offer,
          detail : detail.id,
        }as any)

        const insurance = await  queryRunner.manager.save(newInsurance);
        message.code = 200;
        message.returnObject = {
          ...insurance,
        }
        message.message = "Insurance saved";
        await queryRunner.commitTransaction();
          
      }catch(Exception) {
        await queryRunner.rollbackTransaction();
        message.message = Exception.message;
        message.code    = 500;
      }
      
      return message;
            
      }catch(Exception) {
        message.message = Exception.message;
        message.code    = 500;
        await queryRunner.rollbackTransaction()
      }
    return message;
  }


  async getInsurrance(inssuranceId : any) {
    let message  = new ReturnMessage();
    try{
      const assurance = await assuranceRepository.findOne({where : {id : inssuranceId},relations : ["detail","user","offer"]});
      message.returnObject = assurance;
      message.code = 200;
    }
    catch(Exception) {
      message.message = Exception.message;
      message.code    = 500;
    } 
    return message;
  }


  async addTripFile(tripDetail : any){
    let message  = new ReturnMessage();
    try {

      const newDetail  = await detailRepository.createQueryBuilder().update().set({
        passportPhoto : tripDetail.file
      }).where("id = :id",{id : tripDetail.detail}).execute();

      message.returnObject = newDetail;
      message.message = "Passport updloaded";
      message.code = 200;

    }catch(Exception ) {
      message.message = Exception.message;
      message.code    = 500;
    }

    return message;
  }


  async addAutoFile(tripDetail : any){
    let message  = new ReturnMessage();
    try {

      const newDetail  = await detailRepository.createQueryBuilder().update().set({
        cartePhoto : tripDetail.file
      }).where("id = :id",{id : tripDetail.detail}).execute();

      message.returnObject = newDetail;
      message.message = "Carte grise  updloaded";
      message.code = 200;

    }catch(Exception ) {
      message.message = Exception.message;
      message.code    = 500;
    }

    return message;
  }

}