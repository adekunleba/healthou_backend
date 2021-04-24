import {join} from "path";
import * as DotEnv from 'dotenv';
/**
 * According to this question on stackoverflow
 * Was able to work with ormconfig like this.
 * https://stackoverflow.com/questions/45253571/typeorm-with-multiple-env-setups
 */

DotEnv.config({
    // Need to change this
    path: `${process.cwd()}/.env.dev`,
  });

const baseOptions = {
    type: "mariadb",
    host: String(process.env.MYSQL_HOST),
    port: 3306,
    username: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
  }
  
const testConfig = Object.assign({
    name: "default",
    database: String(process.env.MYSQL_TEST_DATABASE),
    entities: [ join(__dirname, 'src/db/entity/*.orm-entity.ts')],
    migrations: [join(__dirname, 'src/**/migrations/*.ts')],
    factories: [join(__dirname, 'test/db/factories/*.ts')],
}, baseOptions);

const devConfig = Object.assign({
    name: "dev-connection",
    database: String(process.env.MYSQL_DATABASE),
    entities: [join(__dirname, 'src/**/entity/*.orm-entity.ts')],
    migrationsTableName: 'migrations',
    migrations: [join(__dirname, 'src/**/migrations/*.ts')],
    subscribers: [join(__dirname, 'src/**/subscribers/*.ts')],
    cli: {
        migrationsDir: join(__dirname, `src/db/migrations`),
    },
  }, baseOptions);

const prodConfig = Object.assign({
    name: "prod-connection",
    database:  String(process.env.MYSQL_DATABASE),
    entities: [join(__dirname, 'src/**/entity/*.orm-entity.ts')],
    migrationsTableName: 'migrations',
    migrations: [join(__dirname, 'src/**/migrations/*.ts')],
    subscribers: [join(__dirname, 'src/**/subscribers/*.ts')],
    cli: {
        migrationsDir: join(__dirname, `src/db/migrations`),
    },
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
  
module.exports = [ dbConfig ];