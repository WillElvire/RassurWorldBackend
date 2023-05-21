import express from "express";
import { LoginController } from "./login.controller";

/*********************************************** */
const loginRoutes     = express.Router();
const loginController = new LoginController();
/*********************************************** */

loginRoutes.post("/api/login",loginController.login);

export default loginRoutes;