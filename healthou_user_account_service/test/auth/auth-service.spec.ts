import * as Sinon from "sinon";
import { AuthService, UserAuthentication } from "../../src/api/auth/auth.service";
import { UserService } from "../../src/api/healthou_user/user.service";
import { TokenEntityRepository } from "../../src/db/repositories/tokenRepository";
import { userFaker } from "../healthou_user/user-faker";
import { expect } from "chai";
import { createHash } from "../../src/helper/encryption";
import { userServiceMock } from "../healthou_user/user.mocks";
import { authServiceMock } from "./auth.mocks";
import { TokenEntity } from "../../src/db/entity/token.orm-entity";

describe("Run Authentication service", function () {
    let sandbox: Sinon.SinonSandbox;
    let tokenRepository: TokenEntityRepository = new TokenEntityRepository();
    let userService: UserService;
    let user = userFaker()
    let password = user.password;
    const userAuthentication:UserAuthentication = {email: user.email, password: password};
    let authService: AuthService;
    beforeEach(async () => {
        let passwordhash = await createHash(user.password, null);
        user.password = passwordhash.hash;
        user.passwordSalt = passwordhash.salt;

        sandbox = Sinon.createSandbox();
        
        userService = userServiceMock(user).userService;

        authService = authServiceMock(user, userService, tokenRepository);
    })

    afterEach(async () => {
        Sinon.restore();
        sandbox.restore();
    })

    it("Should validate user given an authentication", async () => {
        
        const sampleValidation = Sinon.stub(AuthService.prototype, 'validateUser').returns(
            new Promise((resolve, reject) => {
                if(!user) {
                    reject("undefined user")
                }
                resolve(user);
            })
        )
        const result = await sampleValidation(userAuthentication)
        expect(result?.username).to.equal(user.username);
    })

    it("should validate given user", async () => {
        let validatedUser = await authService.validateUser(userAuthentication);
        expect(validatedUser?.email).to.equal(user.email);
    })

    it("Should create refresh token", async () => {
        const savedToken = Sinon.stub(tokenRepository, 'save').returns(
            new Promise((resolve, reject) => {
                resolve(new TokenEntity());
            })
        )

        let createdToken = await authService.createRefreshToken(user.email);
        expect(createdToken.expiration).to.greaterThan(new Date(Date.now()));
        expect(createdToken.userId).to.equal(user.email);
        expect(createdToken.emailToken).not.to.equal(undefined);
    })
})