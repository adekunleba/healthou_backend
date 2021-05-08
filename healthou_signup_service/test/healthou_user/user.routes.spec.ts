import * as Hapi from "@hapi/hapi";
import { startServer, stopServer } from "../utils/server.util";
import * as Sinon from "sinon";
import UserRoutes from "../../src/api/healthou_user/user.routes";
import { UserController } from "../../src/api/healthou_user/user.controller";
import { UserService } from "../../src/api/healthou_user/user.service";
import { UserEntity } from "../../src/db/entity/user.orm-entity";
import { userFaker } from "./user-faker";
import { userServiceMock } from "./user.mocks";
import { expect } from "chai";


describe("When testing user routes", function () {
    let server: Hapi.Server;
    let sandbox: Sinon.SinonSandbox;
    let userRoutes: UserRoutes
    let userController: UserController
    let userService: UserService
    let user: UserEntity = userFaker();

    before(async () => {
        sandbox = Sinon.createSandbox();
        let mockedUserService = userServiceMock(user, true);
        userService = mockedUserService.userService;
        userController = new UserController(userService);
        userRoutes = new UserRoutes(userController);

        server = await startServer(userRoutes);
    });

    it("Should create a new user", async () => {
        const response = await server.inject({
            method: 'POST',
            url: '/api/signup',
            payload: {
                email: user.email,
                password: user.password,
                username: user.username
            }
        });

        let jsonResponse = JSON.parse(response.payload);
        expect(response.statusCode).to.equal(200);
        expect(jsonResponse['data'][0]['userEmail']).to.equal(user.email);
    })

    it("Should create a new user", async () => {
        const response = await server.inject({
            method: 'POST',
            url: '/api/signup',
            payload: {
                email: user.email,
                password: user.password,
                username: user.username
            }
        });

        let jsonResponse = JSON.parse(response.payload);
        expect(response.statusCode).to.equal(200);
        expect(jsonResponse['data'][0]['userEmail']).to.equal(user.email);
    })



    it("Should be bad request if user email already exists", async () => {
        let mockedUserService = userServiceMock(user);
        userService = mockedUserService.userService;
        userController = new UserController(userService);
        userRoutes = new UserRoutes(userController);

        server = await startServer(userRoutes);
        const response = await server.inject({
            method: 'POST',
            url: '/api/signup',
            payload: {
                email: user.email,
                password: user.password,
                username: user.username
            }
        });

        let jsonResponse = JSON.parse(response.payload);
        expect(response.statusCode).to.equal(400);
    })


    after(async () => {
        stopServer();
    })
    
})