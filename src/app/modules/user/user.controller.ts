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

}