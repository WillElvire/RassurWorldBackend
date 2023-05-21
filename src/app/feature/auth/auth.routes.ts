import express from "express";
import { AuthController } from "./auth.controller";

/*********************************************** */
const authRoutes     = express.Router();
const authController = new AuthController();
/*********************************************** */

authRoutes.post("/api/login",authController.login);
authRoutes.post("/api/register",authController.register);
export default authRoutes;