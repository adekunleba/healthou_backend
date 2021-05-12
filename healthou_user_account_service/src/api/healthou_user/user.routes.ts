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
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'PUT',
                    path: `/api/users/{username}`,
                    options: {
                        handler: this.userController.updateById,
                        // validate: validate.updateById,
                        description: 'Method that updates a user by its id.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: `/api/users/{username}`,
                    options: {
                        handler: this.userController.getByUsername,
                        // validate: validate.getById,
                        description: 'Method that get a user by its id.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/api/users',
                    options: {
                        handler: this.userController.getAll,
                        description: 'Method that gets all users.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    method: 'DELETE',
                    path: `/api/users/{username}`,
                    options: {
                        handler: this.userController.deleteById,
                        // validate: validate.deleteById,
                        description: 'Method that deletes a user by its id.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
                {
                    // I am still in between a POST or GET here
                    method: 'GET',
                    path: `/api/users/validate/{username}`,
                    options: {
                        handler: this.userController.validateUser,
                        // validate: validate.deleteById,
                        description: 'Method that validates a user',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
            ]);
            Logger.info('User routes - new user added');
            resolve();
        });
    }
}