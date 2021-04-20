import config from "../env"
import { ConnectionOptions} from "typeorm"


const maridbConfig :ConnectionOptions = {
    type: "mariadb",
    host: config.typeormMaridb.host,
    port: config.typeormMaridb.port,
    username: config.typeormMaridb.username,
    password: config.typeormMaridb.password,
    database: config.typeormMaridb.database,
    entities: ['src/**/entity/*.orm-entity.ts'],
    migrationsTableName: 'migrations',
    migrations: ['src/**/migrations/*.ts'],
    subscribers: ['src/**/subscribers/*.ts'],
    cli: {
        migrationsDir: `src/db/migrations`,
    },
};


export = maridbConfig;