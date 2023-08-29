import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { DatabaseSourceManager } from "./app/common/classes/init";
import authRoutes from "./app/routes/auth.routes";
import roleRoutes from "./app/routes/roles.routes";
import swaggerDocs from "./app/utils/swagger";
import partnersRoute from "./app/routes/partners.routes";
import { fileUploader } from "./app/utils/fileUpload";
import assuranceRoutes from "./app/routes/assurance.routes";
import { logger } from "./app/utils/logger";
import offerRoutes from "./app/routes/offer.routes";
import path from "path";
import { mailRoute } from "./app/routes/mail.routes";
import userRoute from "./app/routes/user.routes";


const boostraping = {
  init: (app: any, port: number = 3001) => {
    DatabaseSourceManager.getInstance();
    app.use(helmet());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cors());
    app.use(authRoutes);
    app.use(roleRoutes);
    app.use(partnersRoute);
    app.use(assuranceRoutes);
    app.use(offerRoutes);
    app.use(mailRoute);
    app.use(userRoute);
    fileUploader(app);
    swaggerDocs(app,port);
    app.get('*', function(req, res){
      res.status(404).send('what???');
      logger.info("page not found : ",`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    });
    app.use(morgan("combined"));
    app.use((req: any, res: any, next: any) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept",
        'Access-Control-Allow-Origin: *',
        'Access-Control-Allow-Methods: GET, POST, DELETE, PUT',
        'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials: true'
      );
      next();
    });
    app.listen(port, () => logger.info(`listening on port ${port}`));
  },
};

export default boostraping;
// adding Helmet to enhance your Rest API's security
