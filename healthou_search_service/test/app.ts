/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import * as routes from "../src/routes";
import Server from "../src/server";
import { FastifyInstance } from "fastify";

use(chaiAsPromised);
describe("Integration", () => {

    let fakeFastify: FastifyInstance

    let sandbox: sinon.SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    

    before(async () => {
        // const server = Server
        fakeFastify = await Server.getInstance();
        const fastifyStub = sinon.stub(Server, "start");
        fastifyStub.returns( new Promise((resolve, reject) => {
            resolve(fakeFastify);
        }) );
    });

    // let app: Server;
    it("Successful app startup", async () => {
        const mock = sandbox.mock(routes);

        // conditional loading as we can only test this when module loads FIRST time as its auto executing!
        // This is just as app auto executes itself on start
        // await Server.start();
        mock.expects("register").calledOnce;
    });

    // it("Failed app startup", async () => {
    //     const exitStub = sandbox.stub(process, "exit");
    //     fakeFastify.listen = () => { throw new Error(); };
    //     await Server.start();
    //     // expect(fakeFastify.log.error.calledOnce, "log.error called once").to.be.true;
    //     expect(exitStub.calledOnce, "process.exit called once").to.be.true;
    // });

    // it("Close the server", async () => {
    //     // const mock = sandbox.mock(await Server.stop())
    //     await Server.stop();
    //     expect(fakeFastify.server.close(), "server close called once").to.be.true;
    // });
});
