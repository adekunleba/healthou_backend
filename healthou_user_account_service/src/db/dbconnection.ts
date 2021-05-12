import { Connection, createConnection } from 'typeorm';
import { maridbConfig } from './dbconfig'
export class DbConnection {
    async getDefaultConnection(): Promise<Connection> {
        return await createConnection(maridbConfig);
    }
}
