export default {
    host: "127.0.0.1",
    type: "mysql",
    username: "root",
    password: "password",
    database: "rassur_world",
    synchronize: true,
    logging: true,
    entities: [
        __dirname + "./app/entity/*.ts"
    ],
    migrationsTableName : "migrations",
    migrations : [ 
        __dirname + "./app/database/migration/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "database/migrations",
        "subscribersDir": "src/subscriber"
    },
    subscribers: [
        "src/subscriber/**/*.ts"
    ],
    
};