import { RequestDto } from "./dto/request.dto";
import { RequestPersistence } from "./request.persistence";

export class RequestService {
    private requestPersistence  =  new RequestPersistence();
    async save(request : RequestDto) {
      return await this.requestPersistence.save(request);
    }

    async getRequestById(id : string) {
        return await this.requestPersistence.getRequestById(id);
    }

    async getRequestByUserId(id : string) {
        return await this.requestPersistence.getRequestByUserId(id);
    }

    async getRequest() {
        return await this.requestPersistence.getRequest();
    }
    
}