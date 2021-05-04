import { expect } from "chai";
import { tokenFaker } from "../auth/auth-token-faker";
import { userFaker } from "../healthou_user/user-faker";
import { createToken } from "../../src/api/auth/auth.helper";

describe("Test token creation",  function () {

    it("should create new token", async () => {
        let token = tokenFaker()
        let user = userFaker()

        let jwtToken = createToken(user.email, token);
        expect(jwtToken).not.to.equal(undefined)
        if(jwtToken){
            expect(jwtToken.length).to.greaterThan(0);
        }
        
    });
});