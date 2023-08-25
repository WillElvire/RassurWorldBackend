import { logger } from "../../utils/logger";
import { MailService } from "../mail/mail.service";
import { UserRoles } from "../roles/dto/role.dto";
import { AuthService } from "./auth.service";

const authService =  new AuthService();
const mailService = new MailService();

export class AuthController  {
  
    async login(req : any , res : any ) {
      logger.info("login : ",req.body)
      const result =  await authService.login({...req.body});
      logger.info("login response : " ,result)
      res.status(result.code).send(result);
    }


    async register(req: any ,res : any) {
      logger.info("register : ",req.body)
      const result =  await authService.register({...req.body},UserRoles.ADMIN);
      logger.info("register response : ",req.body)
      res.status(result.code).send(result);
    }


   

    async addBusinessAccount(req: any ,res : any) {
      logger.info("register : ",req.body);
      const result =  await authService.register({...req.body},UserRoles.APPORTEUR);
      const mail   =  await mailService.sendMailBienvenue({firstname : result.returnObject?.firstname ,email : result.returnObject?.email,lastname : result.returnObject?.lastname , phone : result.returnObject?.phone});
      logger.info("register response : ",req.body)
      res.status(result.code).send(result);
    }
}