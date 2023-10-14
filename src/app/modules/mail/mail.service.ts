import { ReturnMessage } from './../../common/classes/message';
import { mailData} from './dto/mail.dto';
import { MailBuilder } from './mail.builder';

const mailBuilder = new MailBuilder();
export class MailService {

    async sendMailRelance(data : mailData){
      data.type = "Relance";
      let message = new ReturnMessage();
      try {
        const result = await mailBuilder.addData(data).send();
        message.returnObject = result?.data;
        message.code = 200;
      }catch(Exception) {
         message.code    = 500;
         message.message = Exception.message;
      }
      return message;
     
    }

    async sendMailReceipt(data : mailData) {
      data.type = "Receipt";
      let message = new ReturnMessage();

      try {
        const result = await mailBuilder.addData(data).send();
        message.returnObject = result?.data;
        message.code = 200;
      }catch(Exception) {
        message.code    = 500;
        message.message = Exception.message;
      }
     return message;
    }


    async sendMailCotation(data : mailData) {
      data.type = "Cotation";
      let message = new ReturnMessage();
      try {
        const result = await mailBuilder.addData(data).send();
        message.returnObject = result?.data;
        message.code = 200;
      }catch(Exception) {
        message.code    = 500;
        message.message = Exception.message;
      }
     return message;
    }

    async sendMailBienvenue(data : mailData){
      data.type ="Bienvenue";
      let message = new ReturnMessage();
      try {
        const result = await mailBuilder.addData(data).send();
        message.returnObject = result?.data;
        message.code = 200;
      }catch(Exception) {
         message.code    = 500;
         message.message = Exception.message;
      }
      return message;
    }

    async sendMailPayment(data : mailData){
      data.type  = "Lien";
      let message = new ReturnMessage();
      try {
        const result = await mailBuilder.addData(data).send();
        message.returnObject = result?.data;
        message.code = 200;
      }catch(Exception) {
         message.code    = 500;
         message.message = Exception.message;
      }
      return message;
    }
}