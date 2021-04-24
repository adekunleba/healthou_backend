import { Connection } from "typeorm";
import { ConfigureOption } from "typeorm-seeding";
import { createDatabaseConnection } from "../db/dbutils";

export function prepareServer(options?: {migrate: boolean}) {
    return createDatabaseConnection();
}