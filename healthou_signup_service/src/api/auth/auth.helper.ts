/**
 * Authentication api for the application
 * Taken mostly from:
 * https://github.com/queq1890/real-world-grading-app/blob/main/src/plugins/auth.ts
 *
 * Some good details on Authentication and Authorization and ones to use
 * https://dzone.com/articles/four-most-used-rest-api-authentication-methods
 */
import * as JWT from 'jsonwebtoken';
import { TokenEntity } from '../../db/entity/token.orm-entity';
import config from '../../env';

// Make a cookie plugin
// Make a jwt authentication
// Opaque tokens for authorization

export function createToken(userName: string, token: TokenEntity) {
    return JWT.sign({ userName, token }, config.credentials.jwt_secret, {
        algorithm: 'RS256',
        expiresIn: '10m',
        subject: userName,
    });
}
