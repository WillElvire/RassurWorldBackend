import { OK } from 'http-status-codes';
import { logger } from "../../utils/logger";
import { MailService } from "../mail/mail.service";
import { UserRoles } from "../roles/dto/role.dto";
import { AuthService } from "./auth.service";
import { LogAppender } from '../../common/classes/appender';

const authService =  new AuthService();
const mailService = new MailService();

export class AuthController  {
  
    async login(req : any , res : any ) {
      const result =  await authService.login({...req.body});
      LogAppender.writeLogFromBody(req,result,"AuthController");
      res.status(result.code).send(result);
    }


    async register(req: any ,res : any) {
     
      const result =  await authService.register({...req.body},UserRoles.ADMIN);
      LogAppender.writeLogFromBody(req,result,"AuthController");
      res.status(result.code).send(result);
    }


   

    async addBusinessAccount(req: any ,res : any) {
      const result =  await authService.register({...req.body},UserRoles.APPORTEUR);
      if(result.code == OK){
        const mail   =  await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,email : result.returnObject?.email,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone});
      }
      LogAppender.writeLogFromBody(req,result,"AuthController");
      res.status(result.code).send(result);
    }
}