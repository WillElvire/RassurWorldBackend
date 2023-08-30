import { ReturnMessage } from './../../common/classes/message';
import { RoleRepository } from "../../repository/Role.repository";
import { RoleDto } from "./dto/role.dto";
import { OK } from 'http-status-codes';

export class RolePersistence {

    private _rRoleRepository = RoleRepository;

    async save(role : RoleDto) {
       let message = new ReturnMessage();
      try 
      {
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


    async findRoleByFlag(flag : any) {
      let message  = new ReturnMessage();
      const result = await this._rRoleRepository.findOneBy({
         flag : flag
      });

      message.returnObject = result;
      message.code = OK;
      return message;
    }


    async getLastRoleFlag() {
      let message          = new ReturnMessage();
      const result         = (await this._rRoleRepository.findOne({order : { createdAt : 'desc'}})).flag;
      message.returnObject = result;
      message.code         = 200;
      return message;
    }

    async isRoleExist(id) {
      let message  = new ReturnMessage();
      try {

         const result = await this._rRoleRepository.createQueryBuilder().where("id =  :id or libelle  = :id or flag = :id",{
            id
         }).getExists();

         message.code = 200;
         message.returnObject = result;

      }catch(Exception) {
         message.code = 500;
         message.message = Exception.message;
      }
      return message; 
    }

    async getRole(id) {
      let message  = new ReturnMessage();
      try {

         const result = await this._rRoleRepository.createQueryBuilder().where("id =  :id or libelle  = :id or flag = :id",{
            id
         }).getOne();

         message.code = 200;
         message.returnObject = result;

      }catch(Exception) {
         message.code = 500;
         message.message = Exception.message;
      }
      return message; 
    }
}