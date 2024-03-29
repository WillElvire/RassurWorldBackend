import { ReturnMessage } from './../../common/classes/message';
import { hash } from "../../common/plugins/encryption/encryption";
import { userAutoFirstStepDto } from "../assurance/auto/dto/user.dto";
import { userVoyageFirstStepDto } from "../assurance/voyage/dto/user.dto";
import { RoleDto, UserRoles } from "../roles/dto/role.dto";
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


    async fetchUserByCode(code : string ) {
        return await userPersistence.fetchByCode(code);
    }


    async fetchBusinessAccount() {
        let   message      = new ReturnMessage();
        const businessRole = UserRoles.APPORTEUR;
        message            = await roleService.findRoleByFlag(businessRole);
      
        console.log(message);
        if(!!message.returnObject) {
            const role:RoleDto    =  message.returnObject;
            message = await userPersistence.fetchBusinessAccount(role.id);
            return message;
        }

        message.code = 500;
        message.message = "Internal server error";
        return message;
    }


    async fetchTeamAccount() {
        let   message      = new ReturnMessage();
        const businessRole = UserRoles.ADMIN;
        message            = await roleService.findRoleByFlag(businessRole);
      
        console.log(message);
        if(!!message.returnObject) {
            const role:RoleDto    =  message.returnObject;
            message = await userPersistence.fetchBusinessAccount(role.id);
            return message;
        }

        message.code = 500;
        message.message = "Internal server error";
        return message;
    }


    async deleteTeamMember(memberId : string) {
       return await userPersistence.deleteTeamMember(memberId);
    }

    async activeUserAccount(userId : string , prevStatus : boolean) {
       return await userPersistence.activeUserAccount(userId,prevStatus);
    }

    async updateUser(user) {
        return await userPersistence.updateUser(user);
    }
    

    async addIntermediary(user : userVoyageFirstStepDto ) {

        let   message  = new ReturnMessage();

        if(!user.email || !user.firstname || !user.lastname || !user.phone){
            message.code = 421;
            message.message = "Kindly fill all required fields";
            return message;
        }


        message = await roleService.getRole(UserRoles.APPORTEUR);

        if(message.code != 200) {
           return message;
        }

        const role  = message.returnObject;

        if(!role) {
          message.message = "Role does'nt exsits contact admin";
          message.code = 500;
          return message;
        }

        const userToCreate  : UserDto = {...user , password : hash(user.password), role : role.id };


        message = await userPersistence.isEmailExists(userToCreate.email);

        if(message.returnObject) {
            message.code = 500;
            message.message = "User with this email already exsits";
            return message;
        }

        message = await userPersistence.isPhoneExists(userToCreate.phone);

        if(message.returnObject) {
            message.code = 500;
            message.message = "User with this phone already exsits";
            return message;
        }

        message = await  userPersistence.addPartialUser(userToCreate);
        return message;

    }


    async getUserByParrainCode(code : string){
        return await userPersistence.getUserByParrainCode(code);
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