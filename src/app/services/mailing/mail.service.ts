import { mailData} from "../../modules/mail/dto/mail.dto";
import { mailConfigs } from '../../config/mail';
export type chatDriver = "email" | "document";
const nodemailer = require("nodemailer");

export class EmailService {

  private data?: mailData;
  private body      : string;
  private receiver  : string;
  private filename  : string;
 

  constructor() {}

 
  setData(data : mailData) {
    this.data = data;
    return this;
  }
  
  setBody(body: string) {
    this.body = body;
    return this;
  }

  setReceiver(email: string) {
    this.receiver = email;
    return this;
  }

  private mailTransport() {
    return nodemailer.createTransport({
       host: mailConfigs.host,
       port: mailConfigs.port,
       secure: true, // true for 465, false for other ports
       auth: {
         user: "_mainaccount@myrassurance.com", // generated ethereal user
         pass: "pm3Y0@0Es(8IKq", // generated ethereal password
       },
     })
   }

  


   private  mailSender() {
    return this.mailTransport().sendMail({
      from     : "info@myrassurance.com", // sender address
      to       : this.receiver, // list of receivers
      subject  : "", // Subject line
      text     : this.body, // plain text body
      //html     : this.data.html, // html body
    }).send;
   }
 
   send() {
     return this.mailSender();
   }

  
}




