import * as faker from "faker";
import { TokenEntity } from "../../src/db/entity/token.orm-entity";

export function tokenFaker(): TokenEntity {
    const tokenType = faker.random.word();
    const emailToken = faker.random.word();
    const valid = faker.datatype.boolean();
    const expiration = Date.now() + faker.datatype.number(); 
    const userId = faker.internet.email();

    

    const token = new TokenEntity();
    token.tokenType = tokenType;
    token.emailToken = emailToken;
    token.valid = valid;
    token.expiration = new Date(expiration);
    token.userId = userId;

    return token;
}