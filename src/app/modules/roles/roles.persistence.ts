import { ReturnMessage } from './../../common/classes/message';
import { RoleRepository } from "../../repository/Role.repository";
import { RoleDto } from "./dto/role.dto";
import { OK } from 'http-status-codes';

export class RolePersistence {

    private _rRoleRepository = RoleRepository;

    async save(role : RoleDto) {
       let message = new ReturnMessage();
       try {

         const roleFlagExists = await this._rRoleRepository.findOneBy({
            flag : role.flag
         });

         if(!roleFlagExists) {
            this._rRoleRepository.save(role);
            message.code = OK;
            message.message = "Role enregisté avec succes";
            return message;
         }

         message.code = 500;
         message.message = "Role deja existant";
         return message;
         

       }catch(Exception) {
          message.code = 500;
          message.message = Exception.message;
       }

       return message;
    }
    async find() {
        let message = new ReturnMessage();
        try {
           const result = await this._rRoleRepository.find();
           message.code = OK;
           message.returnObject = result;
 
        }catch(Exception) {
           message.code = 500;
           message.message = Exception.message;
        }
 
        return message; 
    }
}