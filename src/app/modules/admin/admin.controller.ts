import { LogAppender } from "../../common/classes/appender";
import { logger } from "../../utils/logger";
import { AdminService } from "./admin.service";

const adminService = new AdminService();

export class AdminController {

    async fetchAllInsuranceByStatus(req : any ,res : any){
        const result = await adminService.fetchAllInsuranceByStatus(req.body.active ,req.body.payed,req.body.acepted);
        LogAppender.writeLogFromBody(req,result,"AdminController");
        res.status(result.code).send(result);
    }

    async getAppStatistics(req : any , res : any) {
        const result = await adminService.getAppStatistics();
        LogAppender.writeLogFromBody(req,result,"AdminController");
        res.status(result.code).send(result);
    }

}