import * as Hapi from '@hapi/hapi';
import { AuthService } from './api/auth/auth.service';
import { TokenEntityRepository } from "./db/repositories/tokenRepository";
import Logger from './helper/logger';
import { UserService } from './api/healthou_user/user.service';
import { UserEntityRepository } from './db/repositories/userrepository';
import { AuthController } from './api/auth/auth.controller';
import AuthRoutes from './api/auth/auth.routes';
import { UserController } from './api/healthou_user/user.controller';
import UserRoutes from "./api/healthou_user/user.routes";
import { Connection } from 'typeorm';
export default class Router {
    public static async loadRoutes(server: Hapi.Server, dbConnection:Connection): Promise<any> {
        Logger.info('Router - Start adding routes');

        // Register authentication Routes
        // May require get connection to retreive the EntityRepo
        let tokenEntityRepo = dbConnection.getCustomRepository(TokenEntityRepository);
        let userEntityRepo = dbConnection.getCustomRepository(UserEntityRepository);
        let userService = new UserService(userEntityRepo);
        let authService = new AuthService(tokenEntityRepo, userService);
        let authController = new AuthController(authService);
        await new AuthRoutes(authController).register(server);


        // Register User routes
        let userController = new UserController(userService);
        await new UserRoutes(userController).register(server);

        Logger.info('Router - Finish adding routes');
    }
}
