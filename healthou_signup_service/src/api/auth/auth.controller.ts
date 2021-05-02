/**
 * Controllers handle the various things from the Hapi request and response toolkit
 * Therefore whatever your api should do, belongs to the controller
 *
 * A controller can either take a Service or a Resolver that is is derived from the base resolve
 * Check app user resolver.
 *
 * If a controller is to to use the base Resolver, that means it will likely implement the Base CrudController
 *
 *
 */

import { AuthService, UserAuthentication } from './auth.service';
import * as Hapi from '@hapi/hapi';
import { createToken } from './auth.helper';
import createResponse from '../../helper/response';
import * as Boom from '@hapi/boom';

/**
 * AuthController manages everything authentication and verification
 * for the backend managing the Request and response
 */
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Async arrow function that takes request and toolkit
     * authHandler
     * TODO: Be able to also tell user specifc error messages e.g Bad password and all
     * */
    public authHandler = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let authInput = request.payload as UserAuthentication;
            let user = await this.authService.validateUser(authInput);

            //If uuser exists, pass a token authentication.
            if (user) {
                // Create token
                let token = await this.authService.createRefreshToken(user.email);
                // Create jwt signed
                let jwtToken = createToken(user.email, token);
                toolkit
                    .response(createResponse(request, { value: { userEmail: user.email } }))
                    .code(200)
                    .header('Authorization', jwtToken);
            } else
                toolkit.response(
                    createResponse(request, { boom: Boom.unauthorized('Ensure email and password are correct') }),
                );
        } catch (error) {}
    };
}
