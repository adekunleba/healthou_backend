import * as faker from "faker";
import { createHash } from "../../src/helper/encryption";
import { UserEntity } from "../../src/db/entity/user.orm-entity";


export function userFaker() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const middleName = faker.name.firstName();
    const email = faker.internet.email(firstName, lastName, "gmail");
    const userName = faker.internet.userName(firstName, lastName);
    const recoveryEmail = faker.internet.exampleEmail(firstName, lastName);
    const password = faker.random.word();
    const country = faker.address.country();
    // const phoneNumber = faker.phone.phoneNumber(faker.random.word());
    const profilePicture = faker.image.image();
    

    

    const user = new UserEntity();
    user.username = userName;
    user.email = email;
    user.password = password;
    user.recoveryEmail = recoveryEmail;
    user.country = country;
    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName = middleName;
    user.profilePicture = profilePicture;
    return user;
};