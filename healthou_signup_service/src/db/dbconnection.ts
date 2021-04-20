import { Connection, createConnection } from 'typeorm';
// import mariadb from './dbconfig'
import maridbConfig = require('./dbconfig');
export class DbConnection {

    async getDefaultConnection(): Promise<Connection>{
        return await createConnection(maridbConfig)
    }
}
