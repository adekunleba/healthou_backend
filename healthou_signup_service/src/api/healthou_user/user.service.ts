/**
 * Service contains extensions to the Repository
 */

import { UserEntity } from '../../db/entity/user.orm-entity';
import { UserEntityRepository } from '../../db/repositories/userrepository';
import { comparePassword } from '../../helper/encryption';

/**
 * Owner of various methods that runs with the user and its interaction to the database
 */
export class UserService {
    constructor(private readonly userRepository: UserEntityRepository) {}

    /**
     * Find a user in the db given his Email and password
     * This is like the bare minimum authentication for login.
     *
     * One other thing to also check is the the password has stored in the db
     * is the same as the parsed password
     * @param email Email address of user
     * @param password Password of user
     */
    async findUserByEmail(email: string, password: string): Promise<UserEntity | undefined> {
        /**Naturally user is invalid */
        let validUser: boolean = false;

        let user = await this.userRepository.findOneByEmail(email);

        /**If user is defined */
        if (user) {
            validUser = (await comparePassword(password, user.passwordSalt, user.password)).evaluation;
        }
        /**Only returns if all is fine */
        if (validUser) {
            return user;
        }
        return undefined;
    }
}
