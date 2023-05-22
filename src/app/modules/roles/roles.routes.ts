import  express  from 'express';
import { RoleController } from './roles.controller';
import { authMiddleware } from '../../common/middleware/auth';
const roleRoutes = express.Router();
const roleController = new RoleController();

roleRoutes.post("/api/role",authMiddleware,roleController.addRole);
roleRoutes.get("/api/role/{id}",authMiddleware,roleController.findOne);
roleRoutes.get("/api/role",authMiddleware,roleController.find);
roleRoutes.delete("/api/role/{id}",authMiddleware,roleController.deleteOne);

export default roleRoutes;