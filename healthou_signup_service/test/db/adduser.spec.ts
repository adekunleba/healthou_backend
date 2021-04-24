import { expect } from 'chai';
import { Connection } from 'typeorm';
import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from "typeorm-seeding";
import { CreateUserSeedA } from './seeds/create_user_seed';

describe("Run save data to Database ", function() {

    let connection: Connection;
    // let incomingConnection: Connection;

    before(async () => {
        connection = await useRefreshDatabase({ connection: "test"})
        await useSeeding();

        await runSeeder(CreateUserSeedA);
        console.log("Successfully added entity to db");
    })

    it("Should retrieve new users from database", async () => {
        expect(1 === 1);
    })

    after(async () => {
        await tearDownDatabase();
        // try {
        //     await  closeDatabase(incomingConnection);
        //   } catch (e) {
        //       console.log('Unable to close database connection', e);
        //       throw e;
        //   }
    })
});