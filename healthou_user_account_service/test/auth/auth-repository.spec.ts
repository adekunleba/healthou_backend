import { TokenEntity } from "../../src/db/entity/token.orm-entity";
import { TokenEntityRepository } from "../../src/db/repositories/tokenRepository";
import { closeDatabase, createDatabaseConnection, synchronizeDatabase } from "../db/dbutils";
import { Connection } from "typeorm";
import { expect, assert } from "chai";
import { tokenFaker } from "./auth-token-faker";

describe("Run authentication repository", function () {
    let connection: Connection;
    let token: TokenEntity;
    let tokenRepository: TokenEntityRepository;
    before(async () => {
        connection = await createDatabaseConnection();
        await synchronizeDatabase(connection);
        token = tokenFaker()
        tokenRepository = connection.getCustomRepository(TokenEntityRepository);
        await tokenRepository.save(token);
    });

    it("Should retrieve stored token given email Token", async () => {
        let retrievedToken = await tokenRepository.findByEmailToken(token.emailToken);
        expect(retrievedToken?.expiration.toUTCString()).to.equal(token.expiration.toUTCString())
        expect(retrievedToken?.emailToken).to.equal(token.emailToken);
        expect(retrievedToken?.tokenType).to.equal(token.tokenType);
        expect(retrievedToken?.userId).to.equal(token.userId);
        expect(retrievedToken?.valid).to.equal(token.valid);
        
    })

    it("Should corrrectly save token to database", async () => {
        let savedToken = await tokenRepository.save(token);
        let retrievedToken = await tokenRepository.findOne({ where: {emailToken: token.emailToken}});
        expect(retrievedToken?.expiration.toUTCString()).to.equal(savedToken.expiration.toUTCString())
        expect(retrievedToken?.emailToken).to.equal(savedToken.emailToken);
        expect(retrievedToken?.tokenType).to.equal(savedToken.tokenType);
        expect(retrievedToken?.userId).to.equal(savedToken.userId);
        expect(retrievedToken?.valid).to.equal(savedToken.valid);
    })

    after(async () => {
        await closeDatabase(connection);
    })
})