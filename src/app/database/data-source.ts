import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/main.seed";


export const options : DataSourceOptions & SeederOptions = {
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
  seeds : [MainSeeder]
}

export const AppDataSource = new DataSource(options);


/*export const AppDataSource  = createConnection({
    
})*/
