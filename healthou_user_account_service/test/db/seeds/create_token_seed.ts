import { Connection, getConnection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { TokenEntity } from "../../../src/db/entity/token.orm-entity";

export class TokenSeed implements Seeder{
    public async run(factory: Factory, connection: Connection): Promise<void> {
        let token = await factory(TokenEntity)().createMany(5);
        token;
    }
}