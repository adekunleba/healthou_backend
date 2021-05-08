import * as Sinon from "sinon";
import { UserService } from "../../src/api/healthou_user/user.service";
import { TokenEntityRepository } from "../../src/db/repositories/tokenRepository";

describe("Run Authenticaton controller", function () {
    let sandbox: Sinon.SinonSandbox;
    beforeEach(async () => {
        sandbox = Sinon.createSandbox();

        //Create token repo
    })

    afterEach(async () => {
        Sinon.restore();
        sandbox.restore();
    })
})