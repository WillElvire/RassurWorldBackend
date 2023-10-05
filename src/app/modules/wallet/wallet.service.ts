import { WalletDto } from './dto/wallet.dto';
import { WalletPersistence } from './wallet.persistence';
const walletPersistence = new WalletPersistence;
export class WalletService {

    async addWallet(wallet : WalletDto) {
        return await walletPersistence.addWallet(wallet);
    }
}