import { OK } from 'http-status-codes';
import { NOT_FOUND } from 'http-status-codes';
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

            const result = await userRepository.createQueryBuilder().where("id=:id",{id}).getOne();
            message.code = 200;
            message.returnObject = result;

        }catch(Exception ) {
            message.message = Exception.message;
            message.code =  500;
        }
        return message;

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