import { EntityRepository, getRepository, Repository } from 'typeorm';
import { TokenEntity } from '../entity/token.orm-entity';
import { UserEntity } from '../entity/user.orm-entity';

/**
 * Repository can stay whole by itself seperate without having to bring any new
 * other repository in itself.
 */

@EntityRepository(TokenEntity)
export class TokenEntityRepository extends Repository<TokenEntity> {
    async findByEmailToken(emailToken: string): Promise<TokenEntity | undefined> {
        let result: TokenEntity | undefined = await this.findOne({ where: { emailToken: emailToken } });
        return result;
    }
}

// To Generate a token for a user, just use the email and some random generated email token.
//TODO: This authentication and all should reside in redis.

/**
 * https://github.com/alex996/presentations
 * For Sessions
 * User submits login credentials e.g email & password
 * Server verifies the credentials against the DB
 * Server creates a temporary user session
 * Server issues a cookie with a SessionID
 * user sends the cookie with each request
 * Server validates it against the session store and grand access
 * When user logs out server destroys the sess and clears the cookies.
 *
 * Featueres
 * Session is stored - in cache
 */
