import { VoyageController } from './../modules/assurance/voyage/voyage.controller';
import  express  from 'express';
import { AutoController } from '../modules/assurance/auto/auto.controller';

/******************** VARIABLES ********************* */

const assuranceRoutes  = express.Router();
const autoController   = new AutoController();
const voyageController = new VoyageController();

/******************** ASSURANCE AUTO ****************** */





/******************** ASSURANCE VOYAGE ***************** */