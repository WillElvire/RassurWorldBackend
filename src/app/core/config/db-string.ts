export const dbString = (entities: any[]  = null) : any => {
  return {
    type: "mysql",
    host: "0.0.0.0",
    port: 3306,
    username: "dev",
    password: "password",
    database: "rassur_world",
    synchronize: true,
    logging: false,
    /*
      entities,
      migrations: [],
      subscribers: [],
    */
    connectorPackage : "mysql2",
    insecureAuth : true
  };
};
