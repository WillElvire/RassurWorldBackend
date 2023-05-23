import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import expressFileupload from "express-fileupload";
import { DatabaseSourceManager } from "./app/common/classes/init";
import authRoutes from "./app/routes/auth.routes";
import roleRoutes from "./app/routes/roles.routes";
import swaggerDocs from "./app/utils/swagger";
import partnersRoute from "./app/routes/partners.routes";
const express = require("express");



const boostraping = {
  init: (app: any, port: number = 3001) => {
    DatabaseSourceManager.getInstance();
    app.use(helmet());
    app.use(express.static(__dirname + "/uploads"));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(authRoutes);
    app.use(roleRoutes);
    app.use(partnersRoute);
    swaggerDocs(app,port);
    // app.use(servicesRoutes);
    app.use(morgan("combined"));
    app.use((req: any, res: any, next: any) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.use(
      expressFileupload({
        createParentPath: true,
      })
    );
    app.listen(port, () => console.warn(`listening on port ${port}`));
  },
};

export default boostraping;
// adding Helmet to enhance your Rest API's security
