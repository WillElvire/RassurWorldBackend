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
}