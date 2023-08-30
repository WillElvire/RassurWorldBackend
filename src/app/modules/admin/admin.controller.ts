import { logger } from "../../utils/logger";
import { AdminService } from "./admin.service";

const adminService = new AdminService();

export class AdminController {

    async fetchAllInsuranceByStatus(req : any ,res : any){
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await adminService.fetchAllInsuranceByStatus(req.body.active ,req.body.payed,req.body.acepted);
        logger.info(result);
        res.status(result.code).send(result);
    }

    async getAppStatistics(req : any , res : any) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const result = await adminService.getAppStatistics();
        logger.info(result);
        res.status(result.code).send(result);
    }

}