import { RemoteConfig } from "../../modules/transfer/dto/transfer.dto";


export const remoteMiddleware = (req , res ,next)=> {
    RemoteConfig.getInstance(req);
    return next();
}   