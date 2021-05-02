import IRoute from 'src/helper/route';
import * as Hapi from '@hapi/hapi';
import { AuthController } from './auth.controller';
import AuthValidation from './auth.validation';

export default class AuthRoutes implements IRoute {
    constructor(private readonly authController: AuthController) {}

    public async register(server: Hapi.Server): Promise<any> {
        return new Promise<void>(resolve => {
            server.route([
                {
                    method: 'POST',
                    path: '/api/login',
                    options: {
                        handler: this.authController.authHandler,
                        validate: AuthValidation.login,
                    },
                },
            ]);
            resolve();
        });
    }
}
