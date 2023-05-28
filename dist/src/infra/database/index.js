"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var dotenv_1 = require("dotenv");
var typeorm_1 = require("typeorm");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    port: 5432,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    logging: false,
    entities: ["./src/domain/modules/**/entities/*.ts"],
    migrations: ["./src/infra/database/migrations/*.ts"],
    migrationsTableName: "migrations",
});
