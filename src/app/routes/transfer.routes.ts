import { authMiddleware } from '../common/middleware/auth';
import { remoteMiddleware } from '../common/middleware/config';
import { TransferController } from './../modules/transfer/transfer.controller';
import  express  from 'express';


const transferRoutes = express.Router(); 
const transferController = new TransferController()
transferRoutes.post("/api/transfer/momo",remoteMiddleware,transferController.momoTransfer);
transferRoutes.post("/api/transfer/detail",remoteMiddleware,transferController.momoTransDetail);
transferRoutes.get("/api/transfer/detail/:idTransfer",transferController.momoTransDetailByTransId);
transferRoutes.get("/api/transfer/list",authMiddleware,transferController.getTransfer)
export default transferRoutes;