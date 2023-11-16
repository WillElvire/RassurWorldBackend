import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/main.seed";


export const options : DataSourceOptions & SeederOptions = {
  host: process.env.DATABASE_HOST,
  type: "mysql",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
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
