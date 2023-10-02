import { ReturnMessage } from './../../common/classes/message';
import { AuditRepository } from "../../repository/Audit.repository";
import { AuditDto } from './dto/audit.dto';

export class AuditPersistence  {
    private _aRepository = AuditRepository;
   

    public  addAudit(audit : AuditDto) : ReturnMessage {
       let message = new ReturnMessage();
       return message;
    }
}