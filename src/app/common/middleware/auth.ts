import { TokenManager } from "../plugins/token/token";

const jwt = require("jsonwebtoken");

const config = process.env;

export const authMiddleware = (req, res, next) => {
  
  const beared : string = req.headers["authorization"].split("Bearer ")[1];
  const token = req.body.token || req.query.token || req.headers["x-access-token"] || beared;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = new TokenManager().verify(token);
    console.log(decoded);
    // jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
