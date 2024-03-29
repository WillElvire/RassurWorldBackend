import { logger } from "../../utils/logger";


export  class  LogAppender {

    static writeLogFromBody(req,res,controllerName : string) {
        logger.info("\r\n::::::::::::::::::::::::::::::::: LOG ENTRY :::::::::::::::::::::::::::::::::");
        logger.info("LOG DETAILS");
        logger.info("\t|==> LOG FROM : " +req.protocol+"://"+req.headers.host+""+req.originalUrl);
        logger.info(`\t|==> CALLING  ${controllerName.toLocaleUpperCase()} \n\t| REQUEST ==>   + ${LogAppender.stringify(req.body)} +  \n\t|==> RESPONSE :  + ${LogAppender.stringify(res)}`);
    }

    static writeLogFromParams(req,res,controllerName : string) {
        logger.info("\r\n::::::::::::::::::::::::::::::::: LOG ENTRY :::::::::::::::::::::::::::::::::");
        logger.info("LOG DETAILS");
        logger.info("\t|==> LOG FROM : " + req.protocol+"://"+req.headers.host+""+req.originalUrl);
        logger.info(`\t|==> CALLING  ${controllerName.toLocaleUpperCase()} \n\t| REQUEST ==>   + ${JSON.stringify(req.params)} +  \n\t|==> RESPONSE :  + ${JSON.stringify(res)}`);
    }

    private static  stringify(body : any) {
        try {
            return JSON.stringify(body)
        }catch(Exception) {
            return body;
        }
    }
}