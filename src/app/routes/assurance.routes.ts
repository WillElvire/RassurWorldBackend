import { authMiddleware } from './../common/middleware/auth';
import { VoyageController } from './../modules/assurance/voyage/voyage.controller';
import  express  from 'express';
import { AutoController } from '../modules/assurance/auto/auto.controller';
import { AdminController } from '../modules/admin/admin.controller';
import { TransactionController } from '../modules/transaction/transaction.controller';

/********************************************************/
const assuranceRoutes       = express.Router();
const autoController        = new AutoController();
const voyageController      = new VoyageController();
const adminController       = new AdminController();
const transactionController = new TransactionController();
/********************************************************/


/******************** ASSURANCE AUTO ****************** */
assuranceRoutes.post("/api/assur/auto/first-user-step", autoController.firstStep);
assuranceRoutes.post("/api/assur/auto/second-user-step",autoController.secondStep);
assuranceRoutes.post("/api/assur/auto/third-user-step", autoController.thirdStep);
/********************************************************/
assuranceRoutes.get("/api/assur/get/:id", autoController.getInsurrance);
assuranceRoutes.get("/api/assur/validate/:id", autoController.valideCotation);

/******************** ASSURANCE VOYAGE ***************** */
assuranceRoutes.post("/api/assur/voyage/first-user-step", voyageController.firstStep);
assuranceRoutes.post("/api/assur/voyage/second-user-step",voyageController.secondStep);
assuranceRoutes.post("/api/assur/voyage/third-user-step", voyageController.thirdStep);
assuranceRoutes.post("/api/assur/sponsorship", voyageController.fetchInsurranceByParrainId);
/********************************************************/
assuranceRoutes.post("/api/admin/insurance/confirm",authMiddleware,voyageController.confirmInsurance);
/******************** ADMIN ROUTES ***************** */
assuranceRoutes.post("/api/admin/get-from-status",authMiddleware,adminController.fetchAllInsuranceByStatus);
assuranceRoutes.get("/api/admin/statistics",authMiddleware,adminController.getAppStatistics);
assuranceRoutes.put("/api/admin/transaction",authMiddleware,transactionController.update);
/********************************************************/

export default assuranceRoutes;