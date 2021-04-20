import config from "../../src/env";
import { Connection, createConnection} from 'typeorm';

export const createDatabaseConnection = async () : Promise<Connection> => {
    const connection = await createConnection({
        type: "mariadb",
        host: config.typeormMaridb.host,
        port: config.typeormMaridb.port,
        username: config.typeormMaridb.username,
        password: config.typeormMaridb.password,
        database: config.typeormMaridb.test_database,
        entities: ['test/db/test_entities/*.orm-entity.ts'],
        migrations: ['test/db/test_migration/*.ts'],
    })
    return connection;
}

export const synchronizeDatabase = async (connection: Connection) => {
    await connection.dropDatabase();
    return connection.synchronize(true);
};

export const migrateDatabase = async (connection: Connection) => {
    await connection.dropDatabase();
    return connection.runMigrations();
};

export const closeDatabase = (connection: Connection) => {
    return connection.close();
};
