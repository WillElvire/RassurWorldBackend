import  express  from 'express';
import { UserController } from '../modules/user/user.controller';
const userRoute      = express.Router();
const userController = new UserController();

//userRoute.post("api/user");
userRoute.get("/api/user/apporteur",userController.fechApporteur);
userRoute.get("/api/user/team",userController.fechTeam);
userRoute.delete("/api/user/team/:id",userController.deleteTeamMember);
userRoute.post("/api/user/active",userController.activeUserAccount);
userRoute.put("/api/user",userController.updateUser);
export default userRoute;