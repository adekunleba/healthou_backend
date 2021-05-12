import { define } from "typeorm-seeding";
import { UserEntity } from "../../../src/db/entity/user.orm-entity";
import * as Faker from "faker";
import * as uuid from "uuid";

define(UserEntity, (faker: typeof Faker) => {

    // const gender = faker.datatype.number(1);
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
    user.recoveryEmail = recoveryEmail;
    user.password = password;
    user.country = country;
    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName = middleName;
    user.profilePicture = profilePicture;

    return user;
})