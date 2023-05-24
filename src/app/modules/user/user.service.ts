import { ReturnMessage } from './../../common/classes/message';
import { hash } from "../../common/plugins/encryption/encryption";
import { userAutoFirstStepDto } from "../assurance/auto/dto/user.dto";
import { userVoyageFirstStepDto } from "../assurance/voyage/dto/user.dto";
import { UserRoles } from "../roles/dto/role.dto";
import { RoleService } from "../roles/roles.service";
import { UserDto } from "./dto/user.dto";
import { UserPersistence } from './user.persitence';
const roleService = new RoleService();
const userPersistence = new UserPersistence();
export class UserService {

    
    async isEmailExists(email : string) {

    } 

    async isPhoneExists(phone : string) {


    }

    async addPartialUser(user : userVoyageFirstStepDto | userAutoFirstStepDto) {

        let   message  = new ReturnMessage();

        if(!user.email || !user.firstname || !user.lastname || !user.phone){
            message.code = 421;
            message.message = "Kindly fill all required fields";
            return message;
        }

       
        message = await roleService.getRole(UserRoles.CUSTOMER);

        if(message.code != 200) {
           return message;
        }

        const role  = message.returnObject;

        if(!role) {
          message.message = "Role does'nt exsits contact admin";
          message.code = 500;
          return message;
        }

        const matcheUser  : UserDto = {...user , password : hash("1234"), role : role.id };

        message = await userPersistence.isEmailExists(matcheUser.email);

        if(message.returnObject) {
            message.message = "User found";
            message.code = 500;
            return message;
        }

        message = await  userPersistence.addPartialUser(matcheUser);
        return message;

    }
}