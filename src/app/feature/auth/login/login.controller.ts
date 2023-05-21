import { UserRepository } from "../../../repository/User.repository";

export class LoginController {
    async login(req : any , res : any ) {
     await UserRepository.save({
        firstName : "kdjd",
        lastName : "ssisii",
        age : 20
      });
      //console.log(result);
      res.status(200).send(await UserRepository.find());
    }
}