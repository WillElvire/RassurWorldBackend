import { LogAppender } from "../../common/classes/appender";
import { RequestService } from "./request.service";

/******************************************* */
const requestService = new RequestService();
/******************************************* */
export class RequestController {
    async addRequest(req:any , res : any){
     const result = await requestService.save(req.body);
     LogAppender.writeLogFromBody(req, result, "RequestController");
     res.status(result.code).send(result);
    }

    async getRequestById(req:any , res : any){
        const result = await requestService.getRequestById(req.params.id);
        LogAppender.writeLogFromBody(req, result, "RequestController");
        res.status(result.code).send(result);
    }

    async getRequestByUserId(req:any , res : any){
        const result = await requestService.getRequestByUserId(req.body.user);
        LogAppender.writeLogFromBody(req, result, "RequestController");
        res.status(result.code).send(result);
    }
    async getRequest(req : any , res : any) {
        const result = await requestService.getRequest();
        LogAppender.writeLogFromBody(req, result, "RequestController");
        res.status(result.code).send(result);
    }
}