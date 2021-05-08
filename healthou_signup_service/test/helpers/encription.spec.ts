import { createHash, comparePassword } from "../../src/helper/encryption"
import * as Faker from "faker";
import { expect } from "chai";

describe("Test encryption modules",  function () {

    it("should create password hash and validate it", async () => {
        let password = Faker.random.word();
        let hashObj = await createHash(password, null);

        let evaluation = await comparePassword(password, hashObj.salt, hashObj.hash);
        expect(evaluation.evaluation).to.equal(true);
    });
});
