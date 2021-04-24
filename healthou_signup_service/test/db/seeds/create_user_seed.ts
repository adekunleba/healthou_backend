import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../../../src/db/entity/user.orm-entity";
import { UserEntityRepository } from "../../../src/db/repositories/userrepository";
export class CreateUserSeedA {
    
    public async run(factory: Factory, connection: Connection): Promise<any> {
        let userEntities = await factory(UserEntity)().createMany(5);
        // const repo = new UserEntityRepository();
        // return await repo.save(userEntities);
        userEntities;
    }
}