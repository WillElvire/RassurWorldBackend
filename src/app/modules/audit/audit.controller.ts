import { LogAppender } from '../../common/classes/appender';
import { logger } from './../../utils/logger';
import { AuditService } from "./audit.service";

const auditService =  new AuditService();
export class AuditController {

    async addAudit(req : any , res : any ) {
       
        const result =  await auditService.addAudit({...req.body});
        LogAppender.writeLogFromBody(req,result,"AuditController");
        res.status(result.code).send(result);
    }


    async getAuditById(req : any , res : any ) {
        const result =  await auditService.getAuditById(req.params.id);
        LogAppender.writeLogFromParams(req,result,"AuditController");
        res.status(result.code).send(result);
    }

    async getAuditByUserId(req : any , res : any ) {
        const result =  await auditService.getAuditByUserId(req.params.id);
        LogAppender.writeLogFromParams(req,result,"AuditController");
        res.status(result.code).send(result);
    }

    async getAuditBySource(req : any , res : any ) {
        const result =  await auditService.getAuditBySource(req.params.source);
        LogAppender.writeLogFromParams(req,result,"AuditController");
        res.status(result.code).send(result);
    }

    async getAuditByAction(req : any , res : any ) {
        const result =  await auditService.getAuditBySource(req.params.action);
        LogAppender.writeLogFromParams(req,result,"AuditController");
        res.status(result.code).send(result);
    }
}