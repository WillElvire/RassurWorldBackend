import  express  from 'express';
import { RoleController } from '../modules/roles/roles.controller';
import { authMiddleware } from '../common/middleware/auth';

const roleRoutes = express.Router();
const roleController = new RoleController();


 /**
   * @openapi
   * /api/role:
   *  post:
   *     security:
   *       - bearerAuth: []
   *     tags:
   *     - Role
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
roleRoutes.post("/api/role",authMiddleware,roleController.addRole);

/**
   * @openapi
   * /api/role/{id}:
   *  get:
   *     tags:
   *     - Role 
   *     security:
   *       - bearerAuth: []
   *     description: Responds if the app is up and running
   *     parameters:
   *      - name: id
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: App is up and running
   */
roleRoutes.get("/api/role/{id}",authMiddleware,roleController.findOne);
 /**
   * @openapi
   * /api/role:
   *  get:
   *     tags:
   *     - Role 
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   *     
   */
roleRoutes.get("/api/role",authMiddleware,roleController.find);
 /**
   * @openapi
   * /api/role/{id}:
   *  delete:
   *     tags:
   *     - Role 
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
roleRoutes.delete("/api/role/{id}",authMiddleware,roleController.deleteOne);

export default roleRoutes;