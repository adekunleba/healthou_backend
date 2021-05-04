import { TokenEntityRepository } from '../../db/repositories/tokenRepository';
import { UserService } from '../healthou_user/user.service';
import * as Crypto from 'crypto';
import { TokenEntity } from '../../db/entity/token.orm-entity';
import { UserEntity } from '../../db/entity/user.orm-entity';

/**
 * Request for login supplied in this format hence validation too will work accordingly
 */
export interface UserAuthentication {
    email: string;
    password: string;
}

const TOKEN_EXPIRY: number = 1210000000;

export class AuthService {
    constructor(private readonly tokenRepository: TokenEntityRepository, private readonly userService: UserService) {}

    /**
     * Validate a user
     * @param userAuthentication Email and password mapped to type UserAuthentication
     * @returns
     */
    async validateUser(userAuthentication: UserAuthentication): Promise<UserEntity | undefined> {
        let user = await this.userService.findUserByEmail(userAuthentication.email, userAuthentication.password);
        return user;
    }

    async createRefreshToken(id: string): Promise<TokenEntity> {
        let emailToken = Crypto.randomBytes(16).toString('hex');
        let tokenEntity = new TokenEntity();
        tokenEntity.emailToken = emailToken;
        tokenEntity.valid = true;
        tokenEntity.expiration = new Date(Date.now() + TOKEN_EXPIRY);
        tokenEntity.userId = id;
        tokenEntity.tokenType = 'jwt';
        let token = await this.tokenRepository.save(tokenEntity);
        return tokenEntity;
    }
}
