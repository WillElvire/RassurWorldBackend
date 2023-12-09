import { apiGet, configs } from './../../services/api/api.service';
import { apiPost } from '../../services/api/api.service';
import { ReturnMessage } from './../../common/classes/message';
import { ImomoTransfer, RemoteConfig, TransferDto, mobileMoneyPayload, momoProvider } from './dto/transfer.dto';
import { generateId, getApiPath } from '../../common/classes/apiConfig';
import { TransferPersistence } from './transfer.persistence';
import { TransactionService } from '../transaction/transaction.service';
import { transactionStatus } from '../transaction/dto/transaction.dto';


const transferPersistence = new TransferPersistence;
const transactionService  = new TransactionService;


export class TransferService {
    
   constructor(){
    configs.headers["Authorization"]= `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
   }

    async mobileMoneyPayment(momoRequest : ImomoTransfer) {
      let message = new ReturnMessage();
      const api = getApiPath("mobilemoney/v1");
      const config  =  RemoteConfig.getInstance()?.getConfig();
      try {
        configs.headers["mno-name"]      = momoRequest.meanOfPayement;
        configs.headers["Authorization"] = `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
        let request = new mobileMoneyPayload(momoRequest);
        request.currency   = "XOF";
        request.state      = momoRequest.insurranceId;
        const response    = await apiPost(api,{...request}); 
        message.code  = 200;
        message.returnObject = response.data;
        transferPersistence.addTransfer(new TransferDto(api,"mobileMoneyPayment",JSON.stringify(momoRequest),JSON.stringify(message.returnObject),config.browser,config.ipAddress));
        transactionService.update({id : momoRequest.transferId,quantity : 1,status : transactionStatus.PROCESSED,transactionNumb : request.order_id , apiResponse : JSON.stringify(message.returnObject) , meanOfPayment : momoRequest.meanOfPayement})
      }
      catch(Exception) {
        message.code = 500;
        message.message = !!Exception.response.data ? Exception.response.data : Exception.message;
        transferPersistence.addTransfer(new TransferDto(api,"mobileMoneyPayment",JSON.stringify(momoRequest), JSON.stringify(message.message) ,config.browser,config.ipAddress));
      }
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

          const transaction =  await transactionService.getTransactionByTransNum(orderId);

          if(transaction.code != 200 || !transaction?.returnObject) {
            message.code = 500;
            message.message = "Transaction doesn't exists";
            return message;
          }
          configs.headers["mno-name"] = transaction.returnObject.meanOfPayment;
          configs.headers["Authorization"]= `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`;
          console.log(configs)
          const response = await apiGet(api);
          message.code  = 200;
          message.returnObject = response.data;
          
        }
        catch(Exception) {
          message.code = 500;
          message.message = !!Exception.response?.data ? Exception.response?.data : Exception.message;
         
        }
        //transferPersistence.addTransfer(new TransferDto(api,"mobileMoneyPayment",orderId,!!message.message ? JSON.stringify(message.message) : JSON.stringify(message.returnObject),config.browser,config.ipAddress));
        return message;
    }
}