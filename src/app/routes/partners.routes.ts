import { authMiddleware } from '../common/middleware/auth';
import { PartnerController } from './../modules/partners/partner.controller';
import express from "express";


const partnersRoute = express.Router();
const partnerController = new PartnerController();

partnersRoute.post("/api/partner",authMiddleware,partnerController.addPartner);
/**
   * @openapi
   * /api/partner:
   *  get:
   *     summary : Rassur Partners
   *     tags:
   *     - Partner
   *     description: get all rassur partners
   *     responses:
   *       200:
   *         description: App is up and running 
   */
partnersRoute.get("/api/partner",partnerController.getPartners);
partnersRoute.post("/api/partner/rate",authMiddleware,partnerController.addRate);
partnersRoute.get("/api/partner/:id",authMiddleware,partnerController.getPartnerById);
partnersRoute.post("/api/partner/find",authMiddleware,partnerController.getPartnerByFullName);
export default partnersRoute;