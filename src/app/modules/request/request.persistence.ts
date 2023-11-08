import { OK } from "http-status-codes";
import { ReturnMessage } from "../../common/classes/message";
import { RequestRepository } from "../../repository/Request.repository";
import { RequestDto } from "./dto/request.dto";
const _rRequestRepository = RequestRepository;
export class RequestPersistence {
  async getRequestByUserId(id: any) {
    let message = new ReturnMessage();
    try {
      const result = await _rRequestRepository
        .createQueryBuilder()
        .where("userId = :userId", { userId: id })
        .getMany();
      message.code = OK;
      message.returnObject = result;
    } catch (Exception) {
      message.code = 500;
      message.message = Exception.message;
    }
    return message;
  }

  async getRequest() {
    let message = new ReturnMessage();
    try {
      const result = await _rRequestRepository.find({ relations: ["user"] });
      message.code = OK;
      message.returnObject = result;
    } catch (Exception) {
      message.code = 500;
      message.message = Exception.message;
    }
    return message;
  }

  async confirmRequest(id: string) {
    let message = new ReturnMessage();
    try {
      const result = await _rRequestRepository
        .createQueryBuilder()
        .update({ isConfirmed: true })
        .where("id=:id", { id })
        .execute();
      message.message = "Transaction confirmé avec succes";
      message.code = OK;
      message.returnObject = result;
    } catch (Exception) {
      message.code = 500;
      message.message = Exception.message;
    }
    return message;
  }

  async getRequestById(id: string) {
    let message = new ReturnMessage();
    try {
      const result = await _rRequestRepository.findOne({ where: { id } });
      message.code = OK;
      message.returnObject = result;
    } catch (Exception) {
      message.code = 500;
      message.message = Exception.message;
    }
    return message;
  }
  async save(request: RequestDto) {
    let message = new ReturnMessage();
    try {
      const newUser = _rRequestRepository.create({ ...request } as any);
      const result = await _rRequestRepository.save(newUser);
      message.returnObject = result;
      message.code = OK;
      message.message = "Votre requette est en cours de traitement";
      return message;
    } catch (Exception) {
      message.code = 500;
      message.message = Exception.message;
    }
    return message;
  }
}
