import { RoleDto } from "./dto/role.dto";
import { RolePersistence } from "./roles.persistence";

export class RoleService {

    private rolePersistence  =  new RolePersistence();

    async saveRole(role : RoleDto)  {
       return this.rolePersistence.save(role);
    }

    findAll(){
        return this.rolePersistence.find();
    }
    
    findRoleById() {

    }

    isRoleExist(id) {
        return this.rolePersistence.isRoleExist(id);
    }

    getRole(id) {
        return this.rolePersistence.getRole(id);
    }

    findRoleByFlag() {

    }
}