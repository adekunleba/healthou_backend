import * as Sinon from "sinon";
import { UserEntity } from "../../src/db/entity/user.orm-entity";
import { UserEntityRepository } from "../../src/db/repositories/userrepository";
import { UserService } from "../../src/api/healthou_user/user.service";

export function userServiceMock(user: UserEntity, shouldUndefine: boolean = false){

    let userEntityRepo = new UserEntityRepository();
    let entity_repo = Sinon.stub(userEntityRepo, "findOneByEmail").returns(
        new Promise((resolve, reject) => {
            if(shouldUndefine){
                resolve(undefined)
            }else{
                resolve(user);
            }
        })
    );

    let findByUsername = Sinon.stub(userEntityRepo, "findOneByUsername").returns(
            new Promise((resolve, reject) => {
                if(shouldUndefine){
                    resolve(undefined)
                }else{
                    resolve(user);
                }
        })
    );

    let saveUser = Sinon.stub(userEntityRepo, "save").returns(
        new Promise((resolve, reject) => {
            resolve(user)
    })
);
    let userService = new UserService(userEntityRepo)
    return {userEntityRepo, userService};
}