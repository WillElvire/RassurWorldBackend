import { VoyageController } from './../modules/assurance/voyage/voyage.controller';
import  express  from 'express';
import { AutoController } from '../modules/assurance/auto/auto.controller';

/********************************************************/
const assuranceRoutes  = express.Router();
const autoController   = new AutoController();
const voyageController = new VoyageController();
/********************************************************/


/******************** ASSURANCE AUTO ****************** */
assuranceRoutes.post("/api/assur/auto/first-user-step", autoController.firstStep);
assuranceRoutes.post("/api/assur/auto/second-user-step",autoController.secondStep);
assuranceRoutes.post("/api/assur/auto/third-user-step", autoController.thirdStep);
/********************************************************/


/******************** ASSURANCE VOYAGE ***************** */
assuranceRoutes.post("/api/assur/voyage/first-user-step", voyageController.firstStep);
assuranceRoutes.post("/api/assur/voyage/second-user-step",voyageController.secondStep);
assuranceRoutes.post("/api/assur/voyage/third-user-step", voyageController.thirdStep);
/********************************************************/
export default assuranceRoutes;