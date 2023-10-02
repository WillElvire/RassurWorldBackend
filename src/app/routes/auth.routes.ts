import { AuthController } from '../modules/auth/auth.controller';
import express from "express";


/*********************************************** */
const authRoutes     = express.Router();
const authController = new AuthController();
/*********************************************** */


 /**
   * @openapi
   * /api/login:
   *  post:
   *     tags:
   *     - Login
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running 
   *     parameters:
   *      - name: id
   *        in: body
   *        description: The id of the product
   *        required: true
   */
authRoutes.post("/api/login",authController.login);
 /**
   * @openapi
   * /api/register:
   *  post:
   *     tags:
   *     - Register
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
authRoutes.post("/api/register",authController.register);
  /**
   * @openapi
   * /api/business/registration:
   *  post:
   *     tags:
   *     - Register
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
authRoutes.post("/api/business/registration",authController.addBusinessAccount);
export default authRoutes;