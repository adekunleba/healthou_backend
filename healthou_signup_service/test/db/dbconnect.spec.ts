
import { createDatabaseConnection } from './dbutils'
import { expect } from 'chai';
import { Connection } from 'typeorm';

describe("DB Initialization check ", function() {

    let db_connect :Connection;
    before(async function() {
        try {
            db_connect = await createDatabaseConnection();
        } catch (e) {
            console.log('Initializaiton error', e);
            throw e;
        }
    });

    it("should successfully initialize the db", async () => {
        
        expect(db_connect.isConnected === true)
    })
})