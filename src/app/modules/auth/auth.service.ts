import { generateUniqueCodeForUser } from './../../common/plugins/data/data';
import { UserDto } from './../user/dto/user.dto';
import { OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { authLoginDto } from "./dto/auth.dto";
import { AuthPersistence } from "./auth.persistence";
import { TokenManager } from "../../common/plugins/token/token";
import { UserRoles } from '../roles/dto/role.dto';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../audit/dto/audit.dto';
import { WalletService } from '../wallet/wallet.service';


export class AuthService {
  private authPersistance = new AuthPersistence;
  private auditService = new AuditService;
  private walletService = new WalletService;

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
    this.auditService.addAudit({
      user : result.returnObject?.user?.id , 
      source : 'login',
      action : AuditAction.CONNECTION,
      old_value : "",
      new_value : JSON.stringify(result.returnObject?.user)
    });
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

    if(_role == UserRoles.APPORTEUR) {
      this.walletService.addWallet({userId : returnMessage.code == OK ? returnMessage.returnObject.id : "",balance : 0,freeze_amount : 0})
    }
    this.auditService.addAudit({
      user : returnMessage.returnObject?.id , 
      source : "Inscription utilisateur",
      action : AuditAction.INSCRIPTION,
      old_value : "",
      new_value : JSON.stringify(returnMessage.returnObject)
    });

    return returnMessage;
  }
}
