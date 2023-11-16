import { TransferController } from './../modules/transfer/transfer.controller';
import  express  from 'express';


const transferRoutes = express.Router(); 
const transferController = new TransferController()
transferRoutes.post("/api/transfer/momo",transferController.momoTransfer);
transferRoutes.post("/api/transfer/detail",transferController.momoTransDetail);
export default transferRoutes;