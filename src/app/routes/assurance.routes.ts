import { authMiddleware } from './../common/middleware/auth';
import { VoyageController } from './../modules/assurance/voyage/voyage.controller';
import  express  from 'express';
import { AutoController } from '../modules/assurance/auto/auto.controller';
import { AdminController } from '../modules/admin/admin.controller';

/********************************************************/
const assuranceRoutes  = express.Router();
const autoController   = new AutoController();
const voyageController = new VoyageController();
const adminController  = new AdminController();
/********************************************************/


/******************** ASSURANCE AUTO ****************** */
assuranceRoutes.post("/api/assur/auto/first-user-step", autoController.firstStep);
assuranceRoutes.post("/api/assur/auto/second-user-step",autoController.secondStep);
assuranceRoutes.post("/api/assur/auto/third-user-step", autoController.thirdStep);
/********************************************************/


assuranceRoutes.get("/api/assur/get/:id", autoController.getInsurrance);

/******************** ASSURANCE VOYAGE ***************** */
assuranceRoutes.post("/api/assur/voyage/first-user-step", voyageController.firstStep);
assuranceRoutes.post("/api/assur/voyage/second-user-step",voyageController.secondStep);
assuranceRoutes.post("/api/assur/voyage/third-user-step", voyageController.thirdStep);
/********************************************************/



/******************** ADMIN ROUTES ***************** */
assuranceRoutes.post("/api/admin/get-from-status",authMiddleware,adminController.fetchAllInsuranceByStatus);
/********************************************************/

export default assuranceRoutes;