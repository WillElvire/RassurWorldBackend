import { apiGet, configs } from './../../services/api/api.service';
import { apiPost } from '../../services/api/api.service';
import { ReturnMessage } from './../../common/classes/message';
import { mobileMoneyPayload, momoProvider } from './dto/transfer.dto';
import { getApiPath } from '../../common/classes/apiConfig';
export class TransferService {
    
    async mobileMoneyPayment(momoRequest : mobileMoneyPayload , paymentType : momoProvider  = "moov") {
      let message = new ReturnMessage();
      try {
        configs.headers["mno-name"] = paymentType;
        const response = await apiPost(getApiPath("mobilemoney/v1"),{...momoRequest});
        message.code  = 200;
        message.returnObject = response;
      }
      catch(Exception) {
        message.code = 500;
        console.log(Exception)
        message.message = !!Exception.response.data ? Exception.response.data : Exception.message;
        return message;
      }
    }

    async mobileMoneyStatus(orderId : string, paymentType : momoProvider  = "moov") {
        let message = new ReturnMessage();
        try {
          configs.headers["mno-name"] = paymentType;
          const response = await apiGet(getApiPath("mobilemoney/v1/getStatus/"+orderId));
          message.code  = 200;
          message.returnObject = response;
        }
        catch(Exception) {
          message.code = 500;
          message.message = Exception.message;
          return message;
        }
    }
}