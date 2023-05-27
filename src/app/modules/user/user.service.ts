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
      return await userPersistence.isEmailExists(email);
    } 

    async isPhoneExists(phone : string) {

        return await userPersistence.isPhoneExists(phone);
    }

    async getUserById(id : string) {
        return await userPersistence.getUserById(id);
    }

    async addPartialUser(user : userVoyageFirstStepDto | userAutoFirstStepDto, source ?: string) {

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


        if(!!source) {

            message = await userPersistence.getUserByEmail(user.email);
            
            if(!message.returnObject) {

                message = await userPersistence.getUserByPhone(user.phone);

                if(!message.returnObject) {
                    message = await  userPersistence.addPartialUser(matcheUser);
                    return message;
                }

                return message;
              
            }
            return message;
        }

        message = await userPersistence.isEmailExists(matcheUser.email);

        if(message.returnObject) {
            message.code = 500;
            message.message = "User with this email already exsits";
            return message;
        }

        message = await userPersistence.isPhoneExists(matcheUser.phone);

        if(message.returnObject) {
            message.code = 500;
            message.message = "User with this phone already exsits";
            return message;
        }

        message = await  userPersistence.addPartialUser(matcheUser);
        return message;

    }
}