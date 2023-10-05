import { AuditController } from './../modules/audit/audit.controller';
import  express  from 'express';
const auditRoute = express.Router();
const auditController = new AuditController();

auditRoute.post("/api/audit",auditController.addAudit);
auditRoute.post("/api/audit/action/:action",auditController.getAuditByAction);
auditRoute.post("/api/audit/source/:source",auditController.getAuditBySource);
auditRoute.post("/api/audit/:id",auditController.getAuditById)
auditRoute.post("/api/audit/user/:id",auditController.getAuditByUserId)
export {auditRoute} 