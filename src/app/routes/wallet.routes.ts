import  express  from 'express';
import { WalletController } from '../modules/wallet/wallet.controller';

const walletRoutes = express.Router();
const walletController = new WalletController();
walletRoutes.get("/api/wallet/:id",walletController.getwalletById)

export default walletRoutes;