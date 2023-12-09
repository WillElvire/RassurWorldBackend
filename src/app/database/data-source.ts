import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/main.seed";

const DATABASE_HOST = "127.0.0.1";
const DATABASE_USERNAME = "root";
const DATABASE_PASSWORD = "password";
const DATABASE_DB = "rassur_world";

// database connection options
export const options : DataSourceOptions & SeederOptions = {
  host: DATABASE_HOST,
  type: "mysql",
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  synchronize: false,
  logging: true,
  entities: [__dirname + "./../entities/**/*.ts"],
  migrationsTableName : "migrations",
  migrations : [ __dirname + "./database/migrations/**/*.ts"] ,
  dropSchema : false,
  seeds : [MainSeeder]
}

export const AppDataSource = new DataSource(options);


/*export const AppDataSource  = createConnection({
    
})*/
