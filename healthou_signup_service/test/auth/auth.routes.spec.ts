import * as Hapi from "@hapi/hapi";
import { startServer, stopServer } from "../utils/server.util";
import * as Sinon from "sinon";
import { AuthService } from "../../src/api/auth/auth.service";
import { AuthController } from "../../src/api/auth/auth.controller";
import { userFaker } from "../healthou_user/user-faker";
import { TokenEntityRepository } from "src/db/repositories/tokenRepository";
import { userServiceMock } from "../healthou_user/user.mocks";
import { authServiceMock, authTokenRepoMock } from "./auth.mocks";
import AuthRoutes from "../../src/api/auth/auth.routes";
import { expect } from "chai";
import { createToken } from "src/api/auth/auth.helper";


describe("When testing authenticationn route",  function () {
    let server: Hapi.Server;
    let sandbox: Sinon.SinonSandbox;
    let authService: AuthService;
    let authController: AuthController;
    let user = userFaker();
    let tokenRepo: TokenEntityRepository;
    
    before(async () => {
        //Init server
        sandbox = Sinon.createSandbox();
        let userService = userServiceMock(user).userService;
        tokenRepo = authTokenRepoMock();
        authService = authServiceMock(user, userService, tokenRepo);
        authController = new AuthController(authService);
        let authRoutes = new AuthRoutes(authController);
        
        server = await startServer(authRoutes);
    })

    it("Should generate authentication token for login user", async () => {
        const response = await server.inject({
            method: 'POST',
            url: '/api/login',
            payload: {
                email: 'someemail@what.com',
                password: 'akajkja'
            }
        })
        let jsonResponse = JSON.parse(response.payload);
        console.log("check json ", jsonResponse);
        expect(response.headers['authorization'].length).to.greaterThan(0);
        expect(response.statusCode).to.equal(200);
        expect(jsonResponse['data'][0]['userEmail']).to.equal(user.email);
        
    })

    after(async () => {
        stopServer();
    })
})