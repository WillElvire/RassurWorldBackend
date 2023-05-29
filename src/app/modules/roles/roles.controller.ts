import { RoleService } from './roles.service';
import { RoleDto } from "./dto/role.dto";
import { logger } from '../../utils/logger';

/******************************************* */
const roleService  = new RoleService();
/******************************************* */

export class RoleController {

    async addRole(req : any , res : any) {
      logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      logger.info(req.body);
      const role = req.body as RoleDto;
      const result = await roleService.saveRole(role);
      logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      logger.info(result);
      res.status(result.code).send(result);
    }

    findOne(req :  any , res : any) {

    }

    async find(req :  any , res : any) {
      logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      logger.info(req.body);
      const result = await roleService.findAll();
      logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      logger.info(result);
      res.status(result.code).send(result);
    }

    deleteOne(req : any , res  : any) {
        
    }
}