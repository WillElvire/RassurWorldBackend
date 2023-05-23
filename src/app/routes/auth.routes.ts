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
export default authRoutes;