import  express  from 'express';
const userRoute = express.Router();

userRoute.post("api/user");

export {userRoute}