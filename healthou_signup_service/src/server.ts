import * as Hapi from '@hapi/hapi';
import Logger from './helper/logger';
import Plugin from './plugin';
import Router from './router';
import * as DotEnv from 'dotenv';
import config from './env';
import IRoute from './helper/route';

export default class Server {
    private static _instance: Hapi.Server;
    /**
     * Manages the overall run of the application according to the Hapi server
     * Notice it returns Hapi.Server.
     * @returns
     */
    public static async start(): Promise<Hapi.Server> {
        try {
            DotEnv.config({
                // Need to change this
                path: `${process.cwd()}/.env.dev`,
            });

            /**The base app runner for Hapi where the ports and host is set */
            Server._instance = new Hapi.Server({
                port: config.app.port,
                // port: config.app.port,
            });

            Server._instance.validator(require('@hapi/joi'));

            //Can register state for cookies here
            // Server._instance.state({

            // })

            await Plugin.registerAll(Server._instance);
            await Router.loadRoutes(Server._instance);

            await Server._instance.start();

            Logger.info(`Server - Up and running at http://${config.app.host}:${config.app.port}`);
            Logger.info(`Server - Visit http://${config.app.host}:${config.app.port}/api/users for REST API`);
            Logger.info(`Server - Visit http://${config.app.host}:${config.app.port}/documentation for Swagger docs`);

            return Server._instance;
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);

            throw error;
        }
    }

    public static stop(): Promise<Error | void> {
        Logger.info(`Server - Stopping execution`);

        return Server._instance.stop();
    }

    public static async recycle(): Promise<Hapi.Server> {
        Logger.info(`Server - Recycling instance`);

        await Server.stop();

        return await Server.start();
    }

    public static instance(): Hapi.Server {
        return Server._instance;
    }

    public static async inject(options: string | Hapi.ServerInjectOptions): Promise<Hapi.ServerInjectResponse> {
        return await Server._instance.inject(options);
    }

    /**
     * Reference for test server.
     * Might move this to test environment totally.
     */
    public static async testServer(routes: IRoute) {
        try {
            DotEnv.config({
                // Need to change this
                path: `${process.cwd()}/.env.dev`,
            });
            
            Server._instance = new Hapi.Server({
                port: config.app.port,
                // port: config.app.port,
            });
           
    
            Server._instance.validator(require('@hapi/joi'));

            // Register specific routes
            routes.register(Server._instance);
            await Server._instance.initialize();
            return Server._instance;
        } catch (error) {
            Logger.info(`Server - There was something wrong: ${error}`);

            throw error;
        }
    }
}
