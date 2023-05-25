import { authMiddleware } from '../common/middleware/auth';
import { OfferController } from './../modules/offer/offer.controller';
import express from "express";

const offerRoutes = express.Router();
const offerController = new OfferController();

offerRoutes.post("/api/offer",authMiddleware,offerController.addOffer);
offerRoutes.get("/api/offer/:id",offerController.getOfferById);
offerRoutes.get("/api/offer/find/:query",offerController.getOfferByQuery);
offerRoutes.get("/api/offer",offerController.getOffers);
export default offerRoutes;