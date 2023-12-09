import  express  from 'express';
import { MailController } from '../modules/mail/mail.controller';
const mailRoute = express.Router();
const mailController = new MailController();

mailRoute.post("/api/mail/relance",mailController.sendMailRelance);
mailRoute.post("/api/mail/payment",mailController.sendMailPayment);
mailRoute.post("/api/mail/welcome",mailController.sendMailBienvenue);
mailRoute.post("/api/mail/cotation",mailController.sendMailCotation);
mailRoute.post("/api/mail/success",mailController.sendMailSuccess);
export {mailRoute}