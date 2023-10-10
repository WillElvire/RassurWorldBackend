import express from "express";
import { RequestController } from "../modules/request/request.controller";


const requestRoute = express.Router();
const requestController = new RequestController();


requestRoute.post("/api/request",requestController.addRequest);
requestRoute.get("/api/request",requestController.getRequest);
requestRoute.get("/api/request/:id",requestController.getRequestById);
requestRoute.post("/api/request/user",requestController.getRequestByUserId);
export default requestRoute;