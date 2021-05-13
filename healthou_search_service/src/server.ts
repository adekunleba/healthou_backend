
import { fastify, FastifyInstance } from "fastify";
import { register } from "./routes";

export default class Server {

    private static _instance: FastifyInstance;


    public static async start(): Promise<FastifyInstance> {
        try {
            Server._instance = fastify({ logger: true });
            register(Server._instance);
            await Server._instance.listen(3000, "0.0.0.0");
            return Server._instance;
        } catch (err) {
            Server._instance.log.error(err);
            process.exit(1);
        }
    }

    public static async stop(): Promise<Server> {
        return Server._instance.server.close();
    }


    public static async testServer(): Promise<FastifyInstance> {
        try {
            Server._instance = fastify({ logger: true });
            register(Server._instance);
            return Server._instance;
        } catch (err) {
            Server._instance.log.error(err);
            process.exit(1);
        }
    }

    public static async getInstance(): Promise<FastifyInstance> {
        return Server._instance;
    }

}

// let app: FastifyInstance;
// export async function start(): Promise<void> {
//     try {
//         app = fastify({ logger: true });
//         register(app);
//         await app.listen(3000, "0.0.0.0");
//     } catch (err) {
//         app.log.error(err);
//         process.exit(1);
//     }
// }

// export async function stop(): Promise<void> {
//     await app.server.close();
// }

// start();
