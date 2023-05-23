import { TokenManager } from "../plugins/token/token";
import { get } from "lodash";


export const authMiddleware = (req, res, next) => {
  
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");
  //const token = req.body.token || req.query.token || req.headers["x-access-token"] || accessToken;

  if (accessToken) {
    try {
      const decoded = new TokenManager().verify(accessToken);
      req.user = decoded;
      return next();
    }
    catch(Exception) {
      return res.status(401).send("Invalid Token");
    }
  }


  if (req.body.token) {
    try {
      const decoded = new TokenManager().verify(req.body.token);
      req.user = decoded;
      return next();
    }
    catch(Exception) {
      return res.status(401).send("Invalid Token");
    }
   
  }


  if (req.query.token) {
    try {
      const decoded = new TokenManager().verify(req.query.token);
      req.user = decoded;
      return next();
    }
    catch(Exception) {
      return res.status(401).send("Invalid Token");
    }
   
  }

  if (req.headers["x-access-token"]) {
    try {
      const decoded = new TokenManager().verify(req.headers["x-access-token"]);
      req.user = decoded;
      return next();
    }
    catch(Exception) {
      return res.status(401).send("Invalid Token");
    }
  }

  return res.status(403).send("Token required");

};




