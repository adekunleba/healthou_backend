import IRoute from "../../src/helper/route";
import Server from "../../src/server";

/**
 * Start Hapi server for test
 */
export async function startServer(routes: IRoute) {
    if(Server.instance() == undefined) {
        return await Server.testServer(routes);
    }

    await Server.stop();
    return await Server.testServer(routes);
}

export const stopServer = async () => {
    return Server.stop();
}

