import { generateUniqueCodeForUser } from './../../common/plugins/data/data';
import { UserDto } from './../user/dto/user.dto';
import { OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { authLoginDto } from "./dto/auth.dto";
import { AuthPersistence } from "./auth.persistence";
import { TokenManager } from "../../common/plugins/token/token";
import { UserRoles } from '../roles/dto/role.dto';


export class AuthService {
  private authPersistance = new AuthPersistence;

  async login(data : authLoginDto): Promise<ReturnMessage> {

    let returnMessage = new ReturnMessage();

    if (!data.email || !data.password) {
      returnMessage.message = "Veuillez verifier les données renseigné";
      returnMessage.code = 421;
      return returnMessage;
    }

    const result  = await this.authPersistance.login(data);

    if(result.code != OK) {
      return result;
    }
    const token = new TokenManager().sign(data);
    result.returnObject = {user  : result.returnObject , token};
    return result;
  }




  async register(data : UserDto,_role : UserRoles  = UserRoles.MEMBER): Promise<ReturnMessage> {

    let returnMessage = new ReturnMessage();

    if (!data.firstname || !data.lastname || !data.email || !data.password  || !data.phone) {
      returnMessage.message = "Veuillez verifier les données renseigné";
      returnMessage.code = 421;
      return returnMessage;
    }
    data.code = generateUniqueCodeForUser();
    returnMessage = await this.authPersistance.register(data,_role);
    return returnMessage;
  }
}
