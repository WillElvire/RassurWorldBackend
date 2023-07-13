import { mailData } from './dto/mail.dto';

import { logger } from "../../utils/logger";
import { MailService } from "./mail.service";
import { read } from 'fs';
const mailService = new MailService();
export class MailController {

    async sendMailBienvenue(req,res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const data : mailData = {firstname : req.body?.firstname,lastname  : req.body?.lastname ,phone : req.body?.phone }
        const result = await mailService.sendMailBienvenue(data);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }

    async sendMailCotation(req,res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const data : mailData = {firstname : req.body?.firstname,lastname  : req.body?.lastname ,phone : req.body?.phone ,cotation : req.body?.cotation }
        const result = await mailService.sendMailCotation(data);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }


    async uploadDocument(req,res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);

        const data : mailData = {
            firstname : req.body?.firstname,
            lastname  : req.body?.lastname ,
            phone     : req.body?.phone ,
            fileUrl   : req?.file
        }
        const result = await mailService.sendDocument({...data});
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }


    async sendMailPayment(req,res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const data : mailData = {id : req.body?.id ,phone : req.body?.phone }
        const result = await mailService.sendMailPayment(data);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }

    async sendMailRelance(req,res) {
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(req.body);
        const data : mailData = {firstname : req.body?.firstname,lastname  : req.body?.lastname ,phone : req.body?.phone }
        const result = await mailService.sendMailRelance(data);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(result);
        res.status(result.code).send(result);
    }
}