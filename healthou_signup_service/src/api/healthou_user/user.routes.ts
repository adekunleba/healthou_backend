import * as Hapi from "@hapi/hapi";
import IRoute from "../../helper/route";
import { UserController } from "../healthou_user/user.controller";
import Logger from '../../helper/logger';
export default class UserRoutes implements IRoute  {
    constructor(private readonly userController: UserController) {}

    public async register(server: Hapi.Server): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            server.route([
                {
                    method: 'POST',
                    path: '/api/signup',
                    options: {
                        handler: this.userController.createUserHandler,
                        description: 'Method that creates new user',
                        tags: ['api', 'signup'],
                        auth: false,
                    },
                },
            ]);
            Logger.info('User routes - new user added');
            resolve();
        });
    }
}