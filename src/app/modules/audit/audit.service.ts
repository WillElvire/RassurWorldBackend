import { ReturnMessage } from "../../common/classes/message";
import { AuditPersistence } from "./audit.persistence";
import { AuditDto } from "./dto/audit.dto";

const auditPersistence = new AuditPersistence();
export class AuditService {

    async   addAudit(data :  AuditDto){
       
        let message = new ReturnMessage();

        if (!data.source || !data.action) {
            message.message = "Veuillez verifier les données renseigné";
            message.code = 421;
          return message;
        }

        message = await auditPersistence.addAudit(data);
        return message;

    }

    async getAuditById(id : string) {
        return await auditPersistence.getAuditById(id);
    }

    async getAuditBySource(source : string) {
        return await auditPersistence.getAuditBySource(source);
    }

    async getAuditByUserId(userId : string) {
        return await auditPersistence.getAuditByUserId(userId);
    }

    async getAuditByAction(action : string) {
        return await auditPersistence.getAuditByAction(action);
    }
}