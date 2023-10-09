import { RequestDto } from "./dto/request.dto";
import { RequestPersistence } from "./request.persistence";

export class RequestService {
    private requestPersistence  =  new RequestPersistence();
    async save(request : RequestDto) {
      return await this.requestPersistence.save(request);
    }
}