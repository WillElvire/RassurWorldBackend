import { apiGet, configs } from './../../services/api/api.service';
import { apiPost } from '../../services/api/api.service';
import { ReturnMessage } from './../../common/classes/message';
import { mobileMoneyPayload, momoProvider } from './dto/transfer.dto';
import { generateId, getApiPath } from '../../common/classes/apiConfig';
export class TransferService {
    
   constructor(){
    configs.headers["Authorization"]= `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
   }

    async mobileMoneyPayment(momoRequest : mobileMoneyPayload , paymentType : momoProvider  = "moov") {
      let message = new ReturnMessage();
      try {
        configs.headers["mno-name"]      = paymentType;
        configs.headers["Authorization"] = `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
        //define request parameters
        momoRequest.order_id   = generateId();
        momoRequest.reference  = "Payment des frais d'assurance";
        momoRequest.currency   = "XOF";
        momoRequest.state      = "Initialisation";
        momoRequest.return_url = "http://localhost:4200/payment/success";
        momoRequest.cancel_url = "http://localhost:4200/payment/failed";
        const response = await apiPost(getApiPath("mobilemoney/v1"),{...momoRequest});
        message.code  = 200;
        message.returnObject = response;
      }
      catch(Exception) {
        message.code = 500;
        message.message = !!Exception.response.data ? Exception.response.data : Exception.message;
        return message;
      }
    }

    async mobileMoneyStatus(orderId : string, paymentType : momoProvider  = "moov") {
        let message = new ReturnMessage();
        try {
          configs.headers["mno-name"] = paymentType;
          configs.headers["Authorization"]= `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
          const response = await apiGet(getApiPath("mobilemoney/v1/getStatus/"+orderId));
          message.code  = 200;
          message.returnObject = response;
        }
        catch(Exception) {
          message.code = 500;
          message.message = !!Exception.response.data ? Exception.response.data : Exception.message;
          return message;
        }
    }
}