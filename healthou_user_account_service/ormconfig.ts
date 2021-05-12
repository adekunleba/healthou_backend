// import { path.join } from "path";
const DotEnv =  require('dotenv');

const path = require("path");
/**
 * According to this question on stackoverflow
 * Was able to work with ormconfig like this.
 * https://stackoverflow.com/questions/45253571/typeorm-with-multiple-env-setups
 */

DotEnv.config({
    // Need to change this
    path: `${process.cwd()}/.env.dev`,
  });

// const __dirname = process.cwd();

const baseOptions = {
    type: 'mariadb',
    host: String(process.env.MYSQL_HOST),
    port: 3306,
    username: "root",
    password: "healthou",
    timezone: 'Z' // To force using same timezone - had issues with different timezone retrieved from DB
    // logging: true,
  }
  
const testConfig = Object.assign({
    name: "default",
    database: String(process.env.MYSQL_TEST_DATABASE),
    entities: [ path.join(__dirname, 'src/db/entity/*.orm-entity.ts')],
    migrations: [path.join(__dirname, 'test/db/migrations/*.ts')],
    migrationsTableName: 'migrations',
    cli: {
        migrationsDir: path.join(__dirname, `test/db/migrations`),
    },
    // dropSchema: true, // Be carefule of this, this drops your db on every run
    synchronize: true,
    // factories: [path.join(__dirname, 'test/db/factories/*{.ts,.js}')],
    // seeds: [path.join(__dirname, 'test/db/seeds/*{.ts,.js}')]
}, baseOptions);

const devConfig = Object.assign({
    name: "dev-connection",
    database: String(process.env.MYSQL_DATABASE),
    entities: [path.join(__dirname, 'dist/src/**/entity/*.orm-entity.{js,ts}')],
    migrationsTableName: 'migrations',
    migrations: [path.join(__dirname, 'src/**/migrations/*.ts')],
    // subscribers: [path.join(__dirname, 'dist/src/**/subscribers/*.ts')],
    cli: {
        migrationsDir: path.join(__dirname, `src/db/migrations`),
    },
    synchronize: true,
  }, baseOptions);

const prodConfig = Object.assign({
    name: "prod-connection",
    database:  String(process.env.MYSQL_DATABASE),
    entities: [path.join(__dirname, 'dist/src/**/entity/*.orm-entity.{js,ts}')],
    migrationsTableName: 'migrations',
    migrations: [path.join(__dirname, 'src/**/migrations/*.ts')],
    // subscribers: [path.join(__dirname, 'dist/src/**/subscribers/*.ts')],
    cli: {
        migrationsDir: path.join(__dirname, `src/db/migrations`),
    },
    synchronize: true,
}, baseOptions);

const database = {
    development : devConfig,
    production: prodConfig,
    test: testConfig 
}

const node_env = process.env.NODE_ENV;
const env = node_env === "production" ? database.production : node_env === "development" ? database.development : 
                         node_env === "test" ? database.test : database.development;

const dbConfig = env;
console.log("Database in use ", dbConfig.database);

module.exports = [ dbConfig ]