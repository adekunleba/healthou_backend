import { UserService } from "./user.service";
import { UserEntity } from "../../db/entity/user.orm-entity";
import * as Hapi from "@hapi/hapi";
import { EmailExists, UserNameExists } from "../../errors/user.error";
import createResponse from "../../helper/response";
import * as Boom from "@hapi/boom";
import { UserUpdateEntity } from "./user.updateentity";
export class UserController {
    constructor(private readonly userService: UserService) {}

    private replaceUserEntity(userUpdate:UserUpdateEntity, userEntity: UserEntity): UserEntity {
        if (userUpdate.country) {
            userEntity.country = userUpdate.country;
        }

        if (userUpdate.firstName) {
            userEntity.firstName = userUpdate.firstName;
        }

        if (userUpdate.lastName) {
            userEntity.lastName = userUpdate.lastName;
        }

        if (userUpdate.middleName) {
            userEntity.middleName = userUpdate.middleName;
        }

        if(userUpdate.recoverEmail) {
            userEntity.recoveryEmail = userUpdate.recoverEmail;
        }

        if(userUpdate.phoneNumber){
            userEntity.phoneNumber = userUpdate.phoneNumber;
        }

        if(userUpdate.phoneNumberCode) {
            userEntity.phoneNumberCode = userUpdate.phoneNumberCode
        }

        return userEntity;
    }
   
    public createUserHandler = async (request:Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let userInput = request.payload as UserEntity;
            let insertUser = await this.userService.createNewUserBasic(userInput);
            /**
             * Send a mail for validating user and any other logic when creating
             */
             return toolkit.response(
                createResponse(request, { value: { userEmail: insertUser.email }})
            ).code(200)
        } catch (error) {
            if (error instanceof UserNameExists) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.badRequest(error.message)})
                ).code(400);
            } else if (error instanceof EmailExists) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.badRequest(error.message)})
                ).code(400)
            }
            else {
                return toolkit.response(
                    createResponse(request, {boom: Boom.internal(error.message)})
                ).code(500) 
            }
        }
    };



    public updateById = async (request:Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let userInput = request.payload as UserUpdateEntity;
            let userToUpdate = request.params.username;

            // Get user in DB.
            let user = await this.userService.findUserByUsername(userToUpdate);

            if (user === undefined) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.notFound(userToUpdate + " does not exist in db. Recheck the username")})
                ).code(404)
            }

            let updatedUser = this.replaceUserEntity(userInput, user)
            let affectedUpdate = await this.userService.updateUser(updatedUser);

            if(affectedUpdate == undefined) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.internal("Unable to update user " + userToUpdate)})
                ).code(500) 
            }
            if (affectedUpdate == 0) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.internal(`Unable to update user ${userToUpdate} - try again`)})
                ).code(500) 
            }

            return toolkit.response(
                createResponse(request, { value: { userEmail: updatedUser.email, userName: userToUpdate }})
            ).code(200)
            
        } catch (error) {
            return toolkit.response(
                createResponse(request, {boom: Boom.internal(error.message)})
            ).code(500) 
        }
    };


    public getByUsername = async (request:Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let username = request.params.username;
            let user = this.userService.findUserByUsername(username);
            if (user === undefined) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.notFound(`${username} does not exist`)})
                ).code(404);
            }
            return toolkit.response(
                createResponse(request, { value: user})
            ).code(200);
            
        } catch (error) {
            return toolkit.response(
                createResponse(request, {boom: Boom.internal(error.message)})
            ).code(500);
        }
    };

    public getAll = async (request:Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let allUser = this.userService.findAllUsers();
            return toolkit.response(
                createResponse(request, { value: allUser})
            ).code(200);
        } catch (error) {
            return toolkit.response(
                createResponse(request, {boom: Boom.internal(error.message)})
            ).code(500);
        }
    };

    public deleteById = async (request:Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let username = request.params.username;
            let deleted = this.userService.deleteUser(username);
            if (deleted === null || deleted === undefined) {
                return toolkit.response(
                    createResponse(request, {boom: Boom.notFound(`${username} does not exist`)})
                ).code(404);
            }
            return toolkit.response(
                createResponse(request, { value: {username: username}})
            ).code(200);
            
        } catch (error) {
            
        }
    };

    /**
     * Validate a user via a link sent to their email
     * @param request Hapi Request
     * @param toolkit Hapi Response
     */
    public validateUser = async (request:Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
        try {
            let userInput = request.payload as UserEntity;
            
        } catch (error) {
            
        }
    };
}