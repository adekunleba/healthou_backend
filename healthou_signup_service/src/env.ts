import * as DotEnv from 'dotenv';

DotEnv.config({
    // Need to change this
    path: `${process.cwd()}/.env.dev`,
});

let config = {
    // env: process.env.,
    app: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    },
    typeormMaridb: {
        type: 'mariadb',
        host: String(process.env.MYSQL_HOST),
        port: Number.parseInt(process.env.MYSQL_PORT as string, 10),
        username: String(process.env.MYSQL_USER),
        password: String(process.env.MYSQL_PASSWORD),
        database: String(process.env.MYSQL_DATABASE),
        test_database: String(process.env.MYSQL_TEST_DATABASE),
        // logging: ['error', 'migration', 'schema'],
        // entities: [],
        // autoLoadEntities: true,
    },
    credentials: {
        jwt_secret: String(process.env.JWT_SECRET),
    },
};

export default config;
