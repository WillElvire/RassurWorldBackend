import { OK } from "http-status-codes";
import { ReturnMessage } from "../../core/classes/message";
import { UserRepository } from "../../repository/User.repository";

export class AuthService {
  private _rUserRepository = UserRepository;

  login(data): ReturnMessage {
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
