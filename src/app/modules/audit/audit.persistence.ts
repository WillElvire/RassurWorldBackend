import { OK } from 'http-status-codes';
import { ReturnMessage } from './../../common/classes/message';
import { AuditRepository } from "../../repository/Audit.repository";
import { AuditDto } from './dto/audit.dto';
import { DatabaseSourceManager } from '../../common/classes/init';

const auditRepository =  AuditRepository;

export class AuditPersistence  {
  
   

    async   addAudit(auditDto : AuditDto)  {
       let message = new ReturnMessage();
       try{
        const queryRunner = DatabaseSourceManager.getInstance().source().createQueryRunner();
        const newAudit  = auditRepository.save(auditDto as any);
        const audit     = await  queryRunner.manager.save(newAudit);
        message.code = OK;
        message.message = "Audit added successfully";
        message.returnObject = audit;
       }catch(e){
        message.code = 500;
        message.message = e.Message;
       }
     
       return message;

    }


    async getAuditById(id : string) {
        let message = new ReturnMessage();

        try{
            const result = await auditRepository.findBy({id})
            message.code = 200;
            message.returnObject = result;
        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }

    async getAuditByAction(action : string) {
        let message = new ReturnMessage();

        try{
            const result = auditRepository.createQueryBuilder().where("action =  :action",{action}).getMany();
            message.code = 200;
            message.returnObject = result;
        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }


    async getAuditBySource(source : string) {
        let message = new ReturnMessage();

        try{
            const result = auditRepository.createQueryBuilder().where("source =  :source",{source}).getMany();
            message.code = 200;
            message.returnObject = result;
        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }

    async getAuditByUserId(id : string) {
        let message = new ReturnMessage();

        try{
            const result = auditRepository.createQueryBuilder().where("userId =  :id",{id}).getMany();
            message.code = 200;
            message.returnObject = result;
        }catch(Exception) {
        message.code = 500;
        message.message = Exception.message;
        }
        return message;
    }
}