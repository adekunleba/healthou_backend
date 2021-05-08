import * as Sinon from "sinon";
import { UserService } from "../../src/api/healthou_user/user.service";
import { userFaker } from "../healthou_user/user-faker";
import { expect } from "chai";
import { UserEntityRepository } from "../../src/db/repositories/userrepository";
import { createHash } from "../../src/helper/encryption";
import { UserEntity } from "../../src/db/entity/user.orm-entity";
import { userServiceMock } from "./user.mocks";

describe("Run User service", function () {
    let sandbox: Sinon.SinonSandbox;
    let userEntityRepo: UserEntityRepository;
    let user: UserEntity = userFaker();
    let userService: UserService
    let password = user.password;
    
    beforeEach(async () => {
        sandbox = Sinon.createSandbox();

        let hashObj = await createHash(password, null)
        
        user.passwordSalt = hashObj.salt;
        user.password = hashObj.hash;

        let mocks = userServiceMock(user);
        userService = mocks.userService;
        userEntityRepo = mocks.userEntityRepo;

    })

    afterEach(async () => {
        Sinon.restore();
        sandbox.restore();
    })

    it("Should validate user stubs", async () => {
        const result = await userEntityRepo.findOneByEmail(user.email)
        expect(result?.username).to.equal(user.username);
    })

    it("Should validate find user by email", async () => {
        const result = await userService.findUserByEmail(user.email, password)
        expect(result?.username).to.equal(user.username);
        expect(result?.email).to.equal(user.email);
    })


    it("Should be undefined on wrong password", async () => {
        const result = await userService.findUserByEmail(user.email, "some-unknown-passcode")
        expect(result).to.equal(undefined);
    })
})