import { logger } from './../../utils/logger';
import { AuditService } from "./audit.service";

const auditService =  new AuditService();
export class AuditController {

    async addAudit(req : any , res : any ) {
        logger.info("audit : ",req.body)
        const result =  await auditService.addAudit({...req.body});
        logger.info("audit response : " ,result)
        res.status(result.code).send(result);
    }


    async getAuditById(req : any , res : any ) {
        logger.info("audit : ",req.params.id)
        const result =  await auditService.getAuditById(req.params.id);
        logger.info("audit response : " ,result)
        res.status(result.code).send(result);
    }

    async getAuditByUserId(req : any , res : any ) {
        logger.info("audit : ",req.params.id)
        const result =  await auditService.getAuditByUserId(req.params.id);
        logger.info("audit response : " ,result)
        res.status(result.code).send(result);
    }

    async getAuditBySource(req : any , res : any ) {
        logger.info("audit : ",req.params.id)
        const result =  await auditService.getAuditBySource(req.params.source);
        logger.info("audit response : " ,result)
        res.status(result.code).send(result);
    }

    async getAuditByAction(req : any , res : any ) {
        logger.info("audit : ",req.params.id)
        const result =  await auditService.getAuditBySource(req.params.action);
        logger.info("audit response : " ,result)
        res.status(result.code).send(result);
    }
}