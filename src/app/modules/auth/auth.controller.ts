import { logger } from "../../utils/logger";
import { UserRoles } from "../roles/dto/role.dto";
import { AuthService } from "./auth.service";

const authService =  new AuthService();

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
      logger.info("register response : ",req.body)
      res.status(result.code).send(result);
    }
}