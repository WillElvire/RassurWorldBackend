import { RoleService } from './roles.service';
import { RoleDto } from "./dto/role.dto";

/******************************************* */
const roleService  = new RoleService();
/******************************************* */

export class RoleController {

    async addRole(req : any , res : any) {
      const role = req.body as RoleDto;
      const result = await roleService.saveRole(role);
      res.status(result.code).send(result);
    }

    findOne(req :  any , res : any) {

    }

    async find(req :  any , res : any) {
        const result = await roleService.findAll();
        res.status(result.code).send(result);
    }

    deleteOne(req : any , res  : any) {
        
    }
}