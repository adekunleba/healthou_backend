
import { closeDatabase, createDatabaseConnection, migrateDatabase } from './dbutils'
import { expect } from 'chai';
import { Connection } from 'typeorm';

describe("DB Initialization check ", function() {

    let db_connect :Connection;
    before(async function() {
        try {
            db_connect = await createDatabaseConnection();
            await migrateDatabase(db_connect);
        } catch (e) {
            console.log('Initializaiton error', e);
            throw e;
        }
    });

    it("should successfully initialize the db", async () => {
        expect(db_connect.isConnected === true)
    })


    after(async function () {
        try {
          await  closeDatabase(db_connect);
        } catch (e) {
            console.log('Unable to close database connection', e);
            throw e;
        }
    })
})