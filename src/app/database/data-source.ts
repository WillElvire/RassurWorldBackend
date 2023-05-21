import "reflect-metadata";
import { DataSource, createConnection } from "typeorm";


export const AppDataSource = createConnection({
  host: "127.0.0.1",
  type: "mysql",
  username: "root",
  password: "password",
  database: "rassur_world",
  synchronize: true,
  logging: true,
  entities: [__dirname + "./../entities/**/*.ts"],
  migrationsTableName : "migrations",
  migrations : [ __dirname + "./database/migrations/**/*.ts"] ,
  dropSchema : true,
});

/*export const AppDataSource  = createConnection({
    
})*/
