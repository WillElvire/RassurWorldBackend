import { mailData } from "./dto/mail.dto";
import { logger } from "../../utils/logger";
import { MailService } from "./mail.service";
import { ReceiptService } from "../receipt/receipt.service";
import { LogAppender } from "../../common/classes/appender";

/***************************************** */
const mailService = new MailService();
const receiptService = new ReceiptService();
/***************************************** */

export class MailController {
  async sendMailBienvenue(req, res) {
    const data: mailData = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      phone: req.body?.phone,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailBienvenue(data);
    LogAppender.writeLogFromBody(req,result,"MailController");
    res.status(result.code).send(result);
  }

  async sendMailCotation(req, res) {
    const data: mailData = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      phone: req.body?.phone,
      cotation: req.body?.cotation,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
      id : req.body?.id
    };
    const result = await mailService.sendMailCotation(data);
    LogAppender.writeLogFromBody(req,result,"MailController");
    res.status(result.code).send(result);
  }

  async uploadDocument(req, res) {
    let result = await receiptService.save({
      photoUrl: req.file.filename,
      user: req.body.id,
    });

    if (result.code == 200) {
      const data: mailData = {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        phone: req.body?.phone,
        email : req.body?.email,    
        
        photoUrl: result?.returnObject?.photoUrl,
      };

      result = await mailService.sendMailReceipt(data);
      LogAppender.writeLogFromBody(req,result,"MailController");
      res.status(result.code).send(result);
      return;
    }
    //LogAppender.writeLogFromBody(req,result,"MailController");
    res.status(result.code).send(result);
  }

  async sendMailPayment(req, res) {
    const data: mailData = {
      id: req.body?.id,
      phone: req.body?.phone,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailPayment(data);
    LogAppender.writeLogFromBody(req,result,"MailController");
    res.status(result.code).send(result);
  }

  async sendMailRelance(req, res) {
    
    const data: mailData = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      phone: req.body?.phone,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailRelance(data);
    LogAppender.writeLogFromBody(req,result,"MailController");
    res.status(result.code).send(result);
  }
}
