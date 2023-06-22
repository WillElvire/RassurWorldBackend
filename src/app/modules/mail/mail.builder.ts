import { defaultWhatsappMessage, paymentMessage, relationShipMailler } from '../../__moock__/message';
import { WhatsappService } from '../../services/mailing/message.service';
import { mailDriver, mailType, mailData } from './dto/mail.dto';

export class MailBuilder {

    private mailDriver : mailDriver = "Telephone";
    private data ?: mailData;

    setDriver(mailDriver : mailDriver){
        this.mailDriver = mailDriver;
        return this;
    }

    addData(data : mailData) {
       this.data      = data;
       this.data.body = this.getMailTemplate(this.data.type)(this.data);
       return this;
    }

    private configure(){
      if(this.mailDriver == "Telephone") return this.configureTelephoneMail();
      return this.configureEMail();
    }

    private configureTelephoneMail() {
        return new WhatsappService()
        .setBody(this.data.body)
        .setReceiver(this.data.phone);
    }

    private configureEMail() {
        return new WhatsappService()
        .setBody(this.data.body)
        .setReceiver(this.data.email);
    }
    
    send() {
        return this.configure().send()
    }

    private  getMailTemplate(mailType : mailType) {
        switch(mailType) {
          case "Bienvenue" :
             return relationShipMailler;
          case "Lien" : 
             return paymentMessage;
          case "Relance" : 
             return defaultWhatsappMessage;
        }
     }
 
}