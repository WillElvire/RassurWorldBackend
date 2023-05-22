import { AuthService } from "./auth.service";

const authService =  new AuthService();

export class AuthController  {
  
    async login(req : any , res : any ) {
      const result =  await authService.login({...req.body});
      res.status(result.code).send(result);
    }


    async register(req: any ,res : any) {
      const result =  await authService.register({...req.body});
      res.status(result.code).send(result);
    }
}