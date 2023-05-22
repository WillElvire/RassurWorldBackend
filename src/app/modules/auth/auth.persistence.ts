import { EXPECTATION_FAILED, NOT_FOUND, OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { UserRepository } from "../../repository/User.repository";
import { authLoginDto } from "./dto/auth.dto";
import { compare, hash } from "../../common/plugins/encryption/encryption";
import { RoleRepository } from "../../repository/Role.repository";
import { UserRoles } from "../roles/dto/role.dto";

export  class AuthPersistence {

    private _rUserRepository = UserRepository;
    private _rRoleRepository = RoleRepository;
    
    async login(data : authLoginDto) : Promise<ReturnMessage> {

        let message = new ReturnMessage();

        const userCreated = await this._rUserRepository.findOne({
            where: { email : data.email},
            relations :["role"]
            
        });

        if(!userCreated) {
           message.message = "Not found";
           message.code = NOT_FOUND;
           return message;
        }

        if(compare(data.password , userCreated.password)) {
            message.code = OK;
            message.returnObject = userCreated;
            return message;
        }
       
        message.code = 500;
        message.message = "Mauvais mot de passe veuillez ressayer";
        return message;
       
    }

    async register(data : any){

        let message = new ReturnMessage();

        data.password = hash(data.password);
        const role = await this._rRoleRepository.findOneBy({
            flag : !!data.role ? data.role : UserRoles.MEMBER
        });

        data.role = role?.id;
        try 
        {
            // recuperer l'utilisateur existant en fonction de son email et son téléphone
            const userExists = await this._rUserRepository.createQueryBuilder().where("email = :email OR phone = :phone",{
                email : data.email,
                phone : data.phone
            }).getCount();

           
            if(userExists == 0) {
                const result  = await this._rUserRepository.save(data);
                message.code = OK;
                message.message = "Utilisateur crée avec succes";
                return message;
            }

            message.code = 500;
            message.message = "Email ou numero de téléphone déja utilisé";
            return message;
            
            
        }
        catch(Exception){
            message.code = 500;
            message.message = Exception.message;
            return message;
        }
    }
}