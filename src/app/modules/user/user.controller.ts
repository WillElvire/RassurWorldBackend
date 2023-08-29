import { logger } from "../../utils/logger";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {

    async register(req , res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await userService.addIntermediary(req.body);
        logger.info(result);
        res.status(result.code).send(result);
    }

    async fechApporteur(req , res ) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await userService.fetchBusinessAccount();
        logger.info(result);
        res.status(result.code).send(result);
    }

    async fechTeam(req , res ) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await userService.fetchTeamAccount();
        logger.info(result);
        res.status(result.code).send(result);
    }


    async deleteTeamMember(req , res ) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.params.id);
        const result = await userService.deleteTeamMember(req.params.id);
        logger.info(result);
        res.status(result.code).send(result);
    }

    async activeUserAccount(req , res ) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body.userId);
        const result = await userService.activeUserAccount(req.body.userId,req.body.prevStatus);
        logger.info(result);
        res.status(result.code).send(result);
    }

}