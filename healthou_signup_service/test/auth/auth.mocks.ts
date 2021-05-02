import * as Sinon from "sinon";
import { UserEntity } from "../../src/db/entity/user.orm-entity";
import { TokenEntityRepository } from "../../src/db/repositories/tokenRepository";
import { UserService } from "../../src/api/healthou_user/user.service";
import { AuthService } from "../../src/api/auth/auth.service";

export function authServiceMock(user: UserEntity, userService: UserService, tokenRepository: TokenEntityRepository){


    let validatedUser = Sinon.stub(userService, "findUserByEmail").returns(
        new Promise((resolve, reject) => {
            if(!user){
                reject();
            }
            resolve(user);
        })
    );
    let authService = new AuthService(tokenRepository, userService);
    return authService;
}