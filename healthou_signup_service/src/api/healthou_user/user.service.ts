/**
 * Service contains extensions to the Repository
 */

import { EmailExists, UserNameExists } from '../../errors/user.error';
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


    /**
     * Find a user given his or her username
     * @param username: Username of user
     */
    async findUserByUsername(username:string): Promise<UserEntity | undefined> {

        let user = await this.userRepository.findOneByUsername(username);

        /**Only returns if all is fine */
        if (user) {
            return user;
        }
        return undefined;
    }
    

    /**
        Create a new basic user with just the username, email and password  
     * @param user - UserEntity.
     */
    async createNewUserBasic(user: UserEntity) {
        
       
        if ( await this.userRepository.findOneByEmail(user.email) !== undefined) {
            //Email already exists
            throw new EmailExists(user.email + " already exist, use a different email to signup");
        }

        if ( await this.userRepository.findOneByUsername(user.username) !== undefined) {
            //Username already exists
            throw new UserNameExists(user.username + " already exists, choose a different username");
            
        }
         //Insert the user
        const insertResult = await this.userRepository.save(user);
        return insertResult;
    }
}
