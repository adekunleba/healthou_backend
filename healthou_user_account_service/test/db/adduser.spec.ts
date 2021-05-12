import { expect } from 'chai';
import { UserEntityRepository } from "../../src/db/repositories/userrepository";
import { Connection, getCustomRepository } from 'typeorm';
import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from "typeorm-seeding";
import { CreateUserSeedA } from './seeds/create_user_seed';

// describe("Run save data to Database ", function() {

//     let connection: Connection;
//     // let incomingConnection: Connection;

//     before(async () => {
//         connection = await useRefreshDatabase({ connection: "test"})
//         await useSeeding();

//         await runSeeder(CreateUserSeedA);
//         console.log("Successfully added entity to db");
//     })

//     it("Should retrieve new users from database", async () => {
//         let repo = getCustomRepository(UserEntityRepository);
//         let [_, count] = await repo.findAndCount();
//         console.log("Count of data found in db", count);
//         expect(count).to.equals(5);
//     })

//     after(async () => {
//         await tearDownDatabase();
//     })
// });