import boostraping from "./src";
import  express  from 'express';
import * as dotenv from 'dotenv';
const app = express(); 
dotenv.config()
boostraping.init(app,3002);
export default app;