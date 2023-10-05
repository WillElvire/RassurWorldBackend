import { RoleService } from './roles.service';
import { RoleDto } from "./dto/role.dto";
import { logger } from '../../utils/logger';
import { LogAppender } from '../../common/classes/appender';

/******************************************* */
const roleService  = new RoleService();
/******************************************* */

export class RoleController {

    async addRole(req : any , res : any) {
     
      const role = req.body as RoleDto;
      const result = await roleService.saveRole(role);
      LogAppender.writeLogFromBody(req,result,"RoleController");
      res.status(result.code).send(result);
    }

    findOne(req :  any , res : any) {

    }

    async find(req :  any , res : any) {
     
      const result = await roleService.findAll();
      LogAppender.writeLogFromBody(req,result,"RoleController");
      res.status(result.code).send(result);
    }

    deleteOne(req : any , res  : any) {
        
    }
}