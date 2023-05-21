import { OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { UserRepository } from "../../repository/User.repository";

export class AuthService {
  private _rUserRepository = UserRepository;

  async login(data): Promise<ReturnMessage> {

    let returnMessage = new ReturnMessage();

    if (!data.firstName || !data.lastName || !data.age) {
      returnMessage.message = "Veuillez verifier les données renseigné";
      returnMessage.code = 500;
      return returnMessage;
    }

    
    const result  = await this._rUserRepository.save(data);
    console.log(result);
    //returnMessage.message = "Utilisateur crée";
    //returnMessage.code = OK;
     
   
    
    returnMessage.message = result;
    returnMessage.code = 500;
     
    

    return returnMessage;
    
    
  }


  register(data): ReturnMessage {
    let returnMessage = new ReturnMessage();

    if (!data.firstName || !data.lastName || !data.age) {
      returnMessage.message = "Veuillez verifier les données renseigné";
      returnMessage.code = 500;
      return returnMessage;
    }

    try {
      this._rUserRepository.save(data);
      returnMessage.message = "Utilisateur crée";
      returnMessage.code = OK;
    } catch (Exception) {
      returnMessage.message = Exception.message;
      returnMessage.code = 500;
    }
    return returnMessage;
  }
}
