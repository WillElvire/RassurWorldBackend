import { OK } from 'http-status-codes';
import { TransactionRepository } from './../../repository/Transaction.repository';
import { DatabaseSourceManager } from './../../common/classes/init';
import { AssuranceRepository }   from './../../repository/Assurance.repository';
import { ReturnMessage }         from './../../common/classes/message';
import { DetailRepository }      from '../../repository/Detail.repository';
import { fullTripDetail }        from './voyage/dto/field.dto';


const assuranceRepository   = AssuranceRepository;
const detailRepository      = DetailRepository;
const transactionRepository = TransactionRepository;

export class AssurancePersistence {

  async addNewAutoRequest(autoDetail )  {

  }


  async statistics() {
    
    let message   = new ReturnMessage();
    const statics = {
      approvedPayment  : "",
      waitingPayment   : "",
      activatedRequest : ""
    }
    try {
      statics.activatedRequest = (await assuranceRepository.count({ where : {isActive : true}})).toString();
      statics.approvedPayment  = (await  assuranceRepository.count({where : {isPayed : true , isActive : true}})).toString();
      statics.waitingPayment   = (await assuranceRepository.count({ where : {isPayed : false , isActive : true}})).toString();
      message.code             = 200;
      message.returnObject     = statics;
    }
    catch(Exception){
      message.message = Exception.message;
      message.code    = 500;
    }
    return message;

  }
  
  async addNewTripRequest(tripDetail : fullTripDetail) {

    const queryRunner = DatabaseSourceManager.getInstance().source().createQueryRunner();
    let message       = new ReturnMessage();

    try {

      await queryRunner.startTransaction() 
      const newDetail  = detailRepository.create(tripDetail.trip as any);
      const detail     = await  queryRunner.manager.save(newDetail);
        
      try {

        const newTransaction = transactionRepository.create();
        const transaction    = await queryRunner.manager.save(newTransaction);

        try {

          const newInsurance = assuranceRepository.create({
            isPayed     : false,
            isActive    : true,
            user        : tripDetail.user,
            offer       : tripDetail.offer,
            detail      : detail.id,
            transaction : transaction.id,
            parrainCode : tripDetail.parrainCode
            
          }as any)
  
          const insurance      = await  queryRunner.manager.save(newInsurance);
          message.code         = 200;
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


  async findAll(){
    let message  = new ReturnMessage();
    try{
      const assurance = await assuranceRepository.find({relations : ["detail","user","offer","transaction"], order : {createdAt : 'DESC'}});
      message.returnObject = assurance;
      message.code = 200;
    }
    catch(Exception) {
      message.message = Exception.message;
      message.code    = 500;
    } 
    return message;
  }

  async getInsurrance(inssuranceId : any) {
    let message  = new ReturnMessage();
    try{
      const assurance = await assuranceRepository.findOne({where : {id : inssuranceId},relations : ["detail","user","offer","transaction"]});
      message.returnObject = assurance;
      message.code = 200;
    }
    catch(Exception) {
      message.message = Exception.message;
      message.code    = 500;
    } 
    return message;
  }


  async getAllInsuranceRequestByStatus(isPayed :boolean,isActive : boolean, limit : number ) {
    let message = new ReturnMessage();
    try {

      const assurance = await assuranceRepository.find({where : {isPayed  , isActive},relations :["detail","user","offer","transaction"],take : limit});
      message.returnObject = assurance;
      message.code = 200;

    }catch(Exception) {
      message.message = Exception.message;
      message.code    = 500;
    }
    return message;
  }


 
 

  async activeCotation(id : string) {

    let message  = new ReturnMessage();
  
    try 
    {
      const newDetail  = await assuranceRepository.createQueryBuilder().update().set({
        isAcepted : true
      }).where("id = :id",{id : id}).execute();
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


  async  markInsuranceAsConfirmed(insurranceId : string) {
    let message = new ReturnMessage();
    try 
    {
       const insurance = await assuranceRepository.createQueryBuilder().update({isAcepted : true}).where("id=:insurranceId",{insurranceId}).execute();
       message.code    = OK;
       message.message = "Demande confirmé avec success";
    }
    catch(Exception)
    {
      message.message = Exception.message;
      message.code    = 500;
    }

    return message;
  }


  async  markInsuranceAsPayed(insurranceId : string) {
    let message = new ReturnMessage();
    try 
    {
       const insurance = await assuranceRepository.createQueryBuilder().update({isPayed : true}).where("id=:insurranceId",{insurranceId});
       message.code    = OK;
       message.message = "Demande confirmé avec success"
    }
    catch(Exception)
    {
      message.message = Exception.message;
      message.code    = 500;
    }

    return message;
  }

  async fetchInsurranceByParrainId(parrainId : string ) {
    let message = new ReturnMessage();
    try {
      const insuranceUsers = await assuranceRepository.find({where : { parrainCode : parrainId},relations : ['user','detail','transaction','offer']},);
      message.code         = OK;
      message.returnObject = insuranceUsers;
      return message;

    }catch(Exception) {
      message.message = Exception.message;
      message.code    = 500;
      return message;
    }
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