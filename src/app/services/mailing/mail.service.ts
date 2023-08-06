import { nodemailer } from 'nodemailer';
import { mailData, mailDriver } from "../../modules/mail/dto/mail.dto";
import { apiPost } from "./../api/api.service";
import { mailConfigs } from '../../config/mail';

export type chatDriver = "email" | "document";

export class EmailService {

  private data?: mailData;
  private body      : string;
  private receiver  : string;
  private filename  : string;
 

  constructor() {}

 
  
  setBody(body: string) {
    this.body = body;
    return this;
  }

  setReceiver(phone: string) {
    this.receiver = phone;
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
      subject  : this.data.subject, // Subject line
      text     : this.data.body, // plain text body
      //html     : this.data.html, // html body
    }).send;
   }
 
   send() {
     return this.mailSender();
   }

  
}




