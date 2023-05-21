import  express  from 'express';
import { RoleController } from './roles.controller';
const roleRoutes = express.Router();
const roleController = new RoleController();

roleRoutes.post("api/role",roleController.addRole);
roleRoutes.get("api/role/{id}",roleController.findOne);
roleRoutes.delete("api/role/{id}",roleController.deleteOne);