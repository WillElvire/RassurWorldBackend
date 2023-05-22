const jwt = require("jsonwebtoken");

export class TokenManager {
  private token = "RassurAssurance";

  sign(data)  : string {
    return jwt.sign(
      { user_id: data.id, email: data.email },this.token,
      {expiresIn: "24h"}
    );
  }

  verify(token){
    return jwt.verify(token, this.token);
  }

 
}
