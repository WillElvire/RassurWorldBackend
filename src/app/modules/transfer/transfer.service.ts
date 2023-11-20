import { apiGet, configs } from './../../services/api/api.service';
import { apiPost } from '../../services/api/api.service';
import { ReturnMessage } from './../../common/classes/message';
import { RemoteConfig, TransferDto, mobileMoneyPayload, momoProvider } from './dto/transfer.dto';
import { generateId, getApiPath } from '../../common/classes/apiConfig';
import { TransferPersistence } from './transfer.persistence';

const transferPersistence = new TransferPersistence;

export class TransferService {
    
   constructor(){
    configs.headers["Authorization"]= `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
   }

    async mobileMoneyPayment(momoRequest : mobileMoneyPayload , paymentType : momoProvider  = "moov") {
      let message = new ReturnMessage();
      const api = getApiPath("mobilemoney/v1");
      const config  =  RemoteConfig.getInstance()?.getConfig();
      try {
        configs.headers["mno-name"]      = paymentType;
        configs.headers["Authorization"] = `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
        console.log(configs.headers)
       
        //define request parameters
        momoRequest = new mobileMoneyPayload(momoRequest.amount);
        momoRequest.currency   = "XOF";
        momoRequest.state      = "Initialisation";
        const response         = await apiPost(api,{...momoRequest});
        //transferPersistence.addTransfer(transfer  as TransferDto)
        message.code  = 200;
        message.returnObject = response;
      }
      catch(Exception) {
        message.code = 500;
        message.message = !!Exception.response.data ? Exception.response.data : Exception.message;
      }
      transferPersistence.addTransfer(new TransferDto(api,"mobileMoneyPayment",momoRequest,!!message.message ? message.message : message.returnObject,config.browser,config.ipAddress));
      return message;
    }


    async getTransfer() {
      return await transferPersistence.getTransfer();
    }

    async mobileMoneyStatus(orderId : string, paymentType : momoProvider  = "moov") {
        let message   = new ReturnMessage();
        const api     = getApiPath("mobilemoney/v1/getStatus/"+orderId);
        const config  =  RemoteConfig.getInstance()?.getConfig();
        try {
          configs.headers["mno-name"] = paymentType;
          configs.headers["Authorization"]= `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
          const response = await apiGet(api);
          message.code  = 200;
          message.returnObject = response;
        }
        catch(Exception) {
          message.code = 500;
          message.message = !!Exception.response.data ? Exception.response.data : Exception.message;
         
        }
        transferPersistence.addTransfer(new TransferDto(api,"mobileMoneyPayment",orderId,!!message.message ? message.message : message.returnObject,config.browser,config.ipAddress));
        return message;
    }
}