import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "2862",
    database: "student",
    synchronize: true,
    logging: false,
    entities: [User],   // a user table will be created in db
    migrations: [],
    subscribers: [],
})
