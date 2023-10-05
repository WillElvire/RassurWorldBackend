import { LogAppender } from "../../common/classes/appender";
import { logger } from "../../utils/logger";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {

    async register(req , res) {
       
        const result = await userService.addIntermediary(req.body);
        LogAppender.writeLogFromBody(req,result,"UserController");
        res.status(result.code).send(result);
    }

    async fechApporteur(req , res ) {
       
        const result = await userService.fetchBusinessAccount();
        LogAppender.writeLogFromBody(req,result,"UserController");
        res.status(result.code).send(result);
    }

    async fechTeam(req , res ) {
       
        const result = await userService.fetchTeamAccount();
        LogAppender.writeLogFromBody(req,result,"UserController");
        res.status(result.code).send(result);
    }


    async deleteTeamMember(req , res ) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.params.id);
        const result = await userService.deleteTeamMember(req.params.id);
        LogAppender.writeLogFromParams(req,result,"UserController");
        res.status(result.code).send(result);
    }

    async activeUserAccount(req , res ) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body.userId);
        const result = await userService.activeUserAccount(req.body.userId,req.body.prevStatus);
        LogAppender.writeLogFromBody(req,result,"UserController");
        res.status(result.code).send(result);
    }

}