import { UserEntity } from "../../src/db/entity/user.orm-entity";
import { UserEntityRepository } from "../../src/db/repositories/userrepository";
import { closeDatabase, createDatabaseConnection, synchronizeDatabase } from "../db/dbutils";
import { Connection } from "typeorm"
import { expect } from 'chai';
import { userFaker } from "./user-faker";

describe("Run user repository to database",  function () {
    let connection: Connection;
    let user: UserEntity;
    let userRepository: UserEntityRepository;

    before(async () => {
        connection = await createDatabaseConnection();
        await synchronizeDatabase(connection);
        user = userFaker();
        userRepository = connection.getCustomRepository(UserEntityRepository);
        // userRepository.create();
        await userRepository.save(user);
    });

    it("Should retrieve added user and verify its username", async () => {
        let result = await userRepository.findOneByEmail(user.email);
        expect(result?.email).to.equals(user.email);
    })

    it("Should retrieve user by username", async () => {
        let result = await userRepository.findOneByUsername(user.username);
        expect(result?.email).to.equals(user.email);
        expect(result?.username).to.equal(user.username);
    })

    it("Should be undefined if username does not exist in db", async () => {
        let result = await userRepository.findOneByUsername("no-username");
        expect(result).to.equal(undefined);
    })

    it("Should validate if user exists in db", async () => {
        let result = await userRepository.userExists(user.email);
        expect(result).to.equals(true);
    })

    it("Should return false if user is not in db", async () => {
        let result = await userRepository.userExists("some_data@aol.com");
        expect(result).to.equals(false);
    })

    after(async () => {
        await closeDatabase(connection);
    })
})