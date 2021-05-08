import { UserService } from "./user.service";
import { UserEntity } from "../../db/entity/user.orm-entity";
import * as Hapi from "@hapi/hapi";
import { EmailExists, UserNameExists } from "../../errors/user.error";
import createResponse from "../../helper/response";
import * as Boom from "@hapi/boom";
export class UserController {
    constructor(private readonly userService: UserService) {}
   
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
    }
}