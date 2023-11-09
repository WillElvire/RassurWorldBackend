import { UserDto } from './../../../../../frontend/src/app/core/interfaces/dto';
import { OK } from 'http-status-codes';
import { UserRepository } from "../../repository/User.repository";
import { ReturnMessage } from '../../common/classes/message';

const userRepository  = UserRepository;


export class UserPersistence{

    async addPartialUser(user) {
      let message = new ReturnMessage();

      try {

        const newUser   = userRepository.create({...user,isActive : 1} as any);
        const result    = await userRepository.save(newUser);
        message.message = "Utilisateur crée";
        message.code    = 200;
        message.returnObject = result;

      }catch(Exception) {
        message.message = Exception.message;
        message.code =  500;
      }
      return message;
    }


    async getUserByParrainCode(code : string) {
        let message = new ReturnMessage();
        try {
            const result = await userRepository.findOne({where : {code},relations : ["wallet"]});
            message.code = 200;
            message.returnObject = result;
        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;
    }

    async isEmailExists(email : string) {
        let message = new ReturnMessage();
        try {

            const result = await userRepository.createQueryBuilder().where("email=:email",{email}).getExists();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;

    } 


    async getUserById(id : string) {
        let message = new ReturnMessage();
        try {

            const result = await userRepository.findOne({where : {id},relations : ["wallet"]});
            message.code = 200;
            message.returnObject = result;

        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;

    }


    async updateUser(user: any) {
      let message = new ReturnMessage();
      try {
        const accountId = user.id;
        const newUser = await userRepository.createQueryBuilder().update({...user}).where("id=:accountId",{accountId}).execute();
        message.code = 200;
        message.message = "User updated Successfully"
      }catch(Exception) {
        message.message = Exception.message;
        message.code = 500;
      }
      return message;
    }


    async activeUserAccount(accountId : string,prevStatus : boolean) {
        let message = new ReturnMessage();
        try {
            const user = await userRepository.createQueryBuilder().update({isActive : !prevStatus}).where("id=:accountId",{accountId}).execute();
            message.code = 200;
            if(!prevStatus == false){
                message.message = "Compte desactivé avec succes";
            }else{
                message.message = "Compte activé avec succes";
            }
            
        }
        catch(Exception) {
            message.message = Exception.message;
            message.code = 500;
           
        }
        return message;
    }

    async deleteTeamMember(memberId : string) {
        let message = new ReturnMessage();
        try {
           const user = await userRepository.delete({id : memberId});
           console.log(user);
           message.code = OK;
           message.message = "Utilisateur supprimé avec succes";
           return message;
        }
        catch(Exception) {
            message.message = Exception.message;
            message.code = 500;
            return message;
        }
    }
    


    async fetchBusinessAccount(roleId : string ) {
        let message = new ReturnMessage();
        try {
            const user  = await userRepository.createQueryBuilder().innerJoin("role",'user.roleId = role.id').where("roleId=:roleId",{roleId}).orderBy('lastConnection','DESC').getMany()
            message.returnObject = user;
            message.code = OK;
            return message;
        }
        catch(Exception) {
            message.message = Exception.message;
            message.code = 500;
            return message;
        } 
       
    }
    

    async fetchByCode(code : string ) {
        let message = new ReturnMessage();
        const user  = await userRepository.findOne({where : { code }});

        if(!user) {
            message.message = "Aucun apporteur avec ce code n'a été trouvé:( ! ";
            message.code = 500;
            return message;
        }
        message.returnObject = user;
        message.code = OK;
        return message;
    }


    async getUserByEmail(email : string) {
        let message = new ReturnMessage();
        try {

            const result = await userRepository.createQueryBuilder().where("email=:email",{email}).getOne();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;

    } 

    async getUserByPhone(phone : string) {

        let message = new ReturnMessage();
        try {

            const result = await userRepository.createQueryBuilder().where("phone=:phone",{phone}).getOne();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;
    }

    async isPhoneExists(phone : string) {

        let message = new ReturnMessage();
        try {

            const result = await userRepository.createQueryBuilder().where("phone=:phone",{phone}).getExists();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;
    }


    
}