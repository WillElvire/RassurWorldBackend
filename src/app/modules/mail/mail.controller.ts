import { mailData } from "./dto/mail.dto";
import { logger } from "../../utils/logger";
import { MailService } from "./mail.service";
import { ReceiptService } from "../receipt/receipt.service";

/***************************************** */
const mailService = new MailService();
const receiptService = new ReceiptService();
/***************************************** */

export class MailController {
  async sendMailBienvenue(req, res) {
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(req.body);
    const data: mailData = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      phone: req.body?.phone,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailBienvenue(data);
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(result);
    res.status(result.code).send(result);
  }

  async sendMailCotation(req, res) {
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(req.body);
    const data: mailData = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      phone: req.body?.phone,
      cotation: req.body?.cotation,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailCotation(data);
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(result);
    res.status(result.code).send(result);
  }

  async uploadDocument(req, res) {
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(req.body);

    let result = await receiptService.save({
      photoUrl: req.file.filename,
      user: req.body.id,
    });

    if (result.code == 200) {
      const data: mailData = {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        phone: req.body?.phone,
        photoUrl: result?.returnObject?.photoUrl,
      };

      result = await mailService.sendMailReceipt(data);
      logger.info(
        "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      logger.info(result);
      res.status(result.code).send(result);
      return;
    }

    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(result);
    res.status(result.code).send(result);
  }

  async sendMailPayment(req, res) {
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(req.body);
    const data: mailData = {
      id: req.body?.id,
      phone: req.body?.phone,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailPayment(data);
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(result);
    res.status(result.code).send(result);
  }

  async sendMailRelance(req, res) {
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(req.body);
    const data: mailData = {
      firstname: req.body?.firstname,
      lastname: req.body?.lastname,
      phone: req.body?.phone,
      email: req.body?.email,
      useWhatsapp: req.body?.useWhatsapp,
      subject: req.body?.subject,
    };
    const result = await mailService.sendMailRelance(data);
    logger.info(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    logger.info(result);
    res.status(result.code).send(result);
  }
}
