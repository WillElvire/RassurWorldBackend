import { authMiddleware } from '../common/middleware/auth';
import { OfferController } from './../modules/offer/offer.controller';
import express from "express";

const offerRoutes = express.Router();
const offerController = new OfferController();
/**
   * @openapi
   * /api/offer:
   *  post:
   *     summary : Add new offer to rassur
   *     tags:
   *     - Offer
   *     description: Add a new service to Rassur
   *     responses:
   *       200:
   *         description: App is up and running 
   */
offerRoutes.post("/api/offer",authMiddleware,offerController.addOffer);
/**
   * @openapi
   * /api/offer/{id}:
   *  get:
   *     summary : Get 
   *     tags:
   *     - Offer
   *     description: get offer by id
   *     responses:
   *       200:
   *         description: App is up and running 
   */
offerRoutes.get("/api/offer/:id",offerController.getOfferById);
/**
   * @openapi
   * /api/offer/find/{query}:
   *  get:
   *     summary : get offer  by keyword
   *     tags:
   *     - Offer
   *     description: get offer  by keyword
   *     responses:
   *       200:
   *         description: App is up and running 
   */
offerRoutes.get("/api/offer/find/:query",offerController.getOfferByQuery);
/**
   * @openapi
   * /api/offer:
   *  get:
   *     summary : get offers
   *     tags:
   *     - Offer
   *     description: get offers
   *     responses:
   *       200:
   *         description: App is up and running 
   */
offerRoutes.get("/api/offer",offerController.getOffers);
export default offerRoutes;