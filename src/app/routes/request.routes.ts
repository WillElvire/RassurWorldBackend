import express from "express";
import { RequestController } from "../modules/request/request.controller";


const requestRoute = express.Router();
const requestController = new RequestController();


requestRoute.post("/api/request",requestController.addRequest);

export default requestRoute;